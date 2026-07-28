const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const password = process.env.VITE_MONGODB_URI_PW;
const username = process.env.VITE_MONGODB_URI_USERNAME;

const url = `mongodb+srv://${username}:${password}@zuesuep.8bkzlbx.mongodb.net/fullstackopen?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => console.log(err));

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model('Note', noteSchema);

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
const app = express();

// app.use(requestLogger);

app.use(cors());

app.use(express.json());

app.use(express.static('dist'));

app.get('/', (req, res) => {
  console.log('on get /');
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

app.put('/api/notes/:id', async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true,
    });

    if (updatedNote) {
      response.json(updatedNote);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' });
  }
});

app.post('/api/notes', async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

app.delete('/api/notes/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Note.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'malformatted id' });
  }
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
