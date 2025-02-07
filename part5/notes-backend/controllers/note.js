const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/model')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const note = await Note.findById(id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.post('/', async (req, res) => {
  const { content, important } = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const person = await User.findById(decodedToken.id)

  const note = {
    content,
    important: important || false,
    user: person._id,
  }

  const message = new Note(note)
  const savedNote = await message.save()
  person.notes = person.notes.concat(savedNote._id)
  await person.save()
  // console.log(savedNote)
  res.status(201).json(savedNote)
})

notesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { content, important } = req.body

  const note = {
    content,
    important,
    updatedAt: new Date() // Ensure updatedAt is a Date object
  }

  Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedImportance) => {
      console.log(updatedImportance)
      if (!updatedImportance) {
        res.status(404).json({ error: 'note not found' }).end()
      }
      res.json(updatedImportance)
    })
    .catch((err) => next(err))
})

notesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Note.findByIdAndDelete(id)

  // console.log("deleted:", deletedNote.id)
  res.status(204).end()

  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      console.log(`deleted ${deletedNote.id}`)
      res.json(deletedNote)
    })
    .catch((err) => console.log(err))
})

module.exports = notesRouter
