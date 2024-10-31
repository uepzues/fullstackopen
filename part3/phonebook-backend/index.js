const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Persons = require("./mongo.js");

const app = express();

app.use(express.static("dist"));

app.use(cors());

app.use(express.json());

app.use(morgan("tiny"));

morgan.token("postContent", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time[5] ms :postContent"
  )
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/persons", (req, res) => {
  Persons.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/info", (req, res) => {
  Persons.countDocuments({}).then((count) => {
    res.send(
      `<p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>`
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = Persons.find((a) => a.id === id);

  Persons.findById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      console.log("Object not found");
      res.status(404).end();
    }
  });
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "missing content",
    });
  }

  const person = new Persons({ name, number });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

app.patch("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;

  console.log(id);

  const person = {
    name,
    number,
  };
  Persons.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        return res.status(404).send({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  console.log("from backend", id);

  Persons.findByIdAndDelete({ _id: id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Person not found" });
      }

      console.log("DELETED", result);
      res.status(204).end();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end();
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
