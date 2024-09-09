const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((a) => a.id === id);

  if (person) {
    res.json(person);
  } else {
    console.log("Object not found");
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const id = Math.floor(Math.random() * 5000);

  console.log(body);

  const filter = persons.find((p) => p.name === body.name);
  console.log(filter);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing content",
    });
  }

  if (filter) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const contact = {
    id: id.toString(),
    name: body.name,
    number: body.number,
  };

  persons.push(contact);

  res.json(contact);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  person = persons.filter((p) => p.id === id);
  console.log("DELETED", person);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
