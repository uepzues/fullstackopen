const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const mongoose = require('mongoose')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const Note = require('../models/model')
const User = require('../models/user')

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    // console.log("cleared")

    for (let note of helper.initialNotes) {
      let noteObject = new Note(note)
      await noteObject.save()
    }
  })

  test('notes are returned as json', async () => {
    // console.log("entered test")
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map((e) => e.content)
    assert(contents.includes('HTML is easy'))
  })

  describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
      const noteAtStart = await helper.notesInDb()
      const noteToView = noteAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()

      await api.get(`/api/notes/${validNonExistingId}`).expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/notes/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new note', async () => {
    const user = await User.findOne({ username: 'kims' })
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.SECRET
    )

    test('a valid note can be added', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map((n) => n.content)

      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('note with invalid data is not added code 400', async () => {
      const newNote = {
        important: true,
      }
      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('a note can be deleted if id is valid', async () => {
      const noteAtStart = await helper.notesInDb()
      const noteToDelete = noteAtStart[0]

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

      const notesAtEnd = await helper.notesInDb()

      const contents = notesAtEnd.map((r) => r.content)
      assert(!contents.includes(noteToDelete.content))

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
