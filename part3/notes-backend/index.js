const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const password = process.env.VITE_MONGODB_URI_PW;
const username = process.env.VITE_MONGODB_URI_USERNAME;

const url = `mongodb+srv://${username}:${password}@zuesuep.8bkzlbx.mongodb.net/fullstackopen?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log(err));

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);


const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const app = express();

// app.use(requestLogger);

app.use(cors());

app.use(express.json());

app.use(express.static("dist"));

app.use(unknownEndpoint);

app.get("/", (req, res) => {
  console.log("on get /");
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  console.log(Note);
  Note.find({}).then((notes) => {
    console.log(notes);
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

const generatedID = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;

  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generatedID(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id === id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
