const config = require("./utils/config.js")

const express = require("express")
const cors = require("cors")
const Note = require("./models/model.js")

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  // console.log("Body:  ", request.body)
  console.log("---")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const app = express()

app.use(requestLogger)

app.use(cors())

app.use(express.json())

app.use(express.static("dist"))

app.get("/", (req, res) => {
  console.log("on get /")
  res.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

app.get("/api/notes/:id", (req, res, next) => {
  const id = req.params.id

  Note.findById(id)
    .then((note) => {
      console.log("from get by id", note.id)
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post("/api/notes", (req, res, next) => {
  const { content, important } = req.body

  if (!content) {
    return res.status(400).json({
      error: "content missing",
    })
  }

  const note = {
    content,
    important: Boolean(important) || false,
  }

  const message = new Note(note)

  message
    .save()
    .then((savedNote) => {
      console.log(savedNote)
      res.json(savedNote)
    })
    .catch((error) => next(error))
})

app.put("/api/notes/:id", (req, res, next) => {
  const id = req.params.id

  const { content, important } = req.body

  const note = {
    content,
    important,
  }

  Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedImportance) => {
      res.json(updatedImportance)
    })
    .catch((err) => next(err))
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      console.log(`deleted ${deletedNote.id}`)
    })
    .catch((err) => console.log(err))

  res.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
