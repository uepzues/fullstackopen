const notesRouter = require("express").Router()
const Note = require("../models/model")
const User = require("../models/user")

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const note = await Note.findById(id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.post("/", async (req, res) => {
  const { content, important, userId } = req.body

  // if (!content) {
  //   return res.status(400).json({
  //     error: "content missing",
  //   })
  // }

  const user = await User.findById(userId)

  const note = {
    content,
    important: important || false,
    date: new Date(),
    user: userId,
  }

  const message = new Note(note)
  const savedNote = await message.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  // console.log(savedNote)
  res.status(201).json(savedNote)
})

notesRouter.put("/:id", async (req, res) => {
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
  await Note.findByIdAndDelete(id)

  // console.log("deleted:", deletedNote.id)
  res.status(204).end()

  // Note.findByIdAndDelete(id)
  //   .then((deletedNote) => {
  //     console.log(`deleted ${deletedNote.id}`)
  //     res.json(deletedNote)
  //   })
  //   .catch((err) => console.log(err))
})

module.exports = notesRouter
