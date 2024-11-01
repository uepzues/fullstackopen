const notesRouter = require("express").Router()
const Note = require("../models/model")

notesRouter.get("/", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

notesRouter.get("/:id", (req, res, next) => {
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

notesRouter.post("/", (req, res, next) => {
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

notesRouter.put("/:id", (req, res, next) => {
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

notesRouter.delete("/:id", (req, res) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      console.log(`deleted ${deletedNote.id}`)
      res.json(deletedNote)
    })
    .catch((err) => console.log(err))
})

module.exports = notesRouter
