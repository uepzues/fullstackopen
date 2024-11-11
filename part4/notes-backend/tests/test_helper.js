const Note = require("../models/model")

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only javascript",
    important: true,
  },
]

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
}
