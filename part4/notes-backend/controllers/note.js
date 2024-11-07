const notesRouter = require("express").Router()
const Note = require("../models/model")

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)

  // Note.find({}).then((notes) => {
  //   res.json(notes)
  // })
})

notesRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id

  const note = await Note.findById(id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }

  // Note.findById(id)
  //   .then((note) => {
  //     console.log("from get by id", note.id)
  //     if (note) {
  //       res.json(note)
  //     } else {
  //       res.status(404).end()
  //     }
  //   })
  //   .catch((error) => next(error))
})

notesRouter.post("/", async (req, res, next) => {
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
  const savedNote = await message.save()
  console.log(savedNote)
  res.status(201).json(savedNote)

  // message
  //   .save()
  //   .then((savedNote) => {
  //     console.log(savedNote)
  //     res.json(savedNote)
  //   })
  //   .catch((error) => next(error))
})

notesRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id

  const { content, important } = req.body

  const note = {
    content,
    important,
  }

  const updatedImportance = await Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })

  res.json(updatedImportance)

  // Note.findByIdAndUpdate(id, note, {
  //   new: true,
  //   runValidators: true,
  //   context: "query",
  // })
  //   .then((updatedImportance) => {
  //     res.json(updatedImportance)
  //   })
  //   .catch((err) => next(err))
})

notesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id

  const deletedNote = await Note.findByIdAndDelete(id)

  console.log("deleted:", deletedNote.id)
  res.json(deletedNote)

  // Note.findByIdAndDelete(id)
  //   .then((deletedNote) => {
  //     console.log(`deleted ${deletedNote.id}`)
  //     res.json(deletedNote)
  //   })
  //   .catch((err) => console.log(err))
})

module.exports = notesRouter
