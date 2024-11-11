const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const mongoose = require("mongoose")
const api = supertest(app)

const Note = require("../models/model")

// const initialNotes = [
//   {
//     content: "HTML is easy",
//     important: false,
//   },
//   {
//     content: "Browser can execute only javascript",
//     important: true,
//   },
// ]

beforeEach(async () => {
  await Note.deleteMany({})
  console.log("cleared")

  // let noteObject = new Note(helper.initialNotes[0])
  // await noteObject.save()

  // noteObject = new Note(helper.initialNotes[1])
  // await noteObject.save()

  // helper.initialNotes.forEach(async (note) => {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  //   console.log("saved")
  //   })

  const noteObjects = new Note(helper.initialNotes).map(
    (note) => new Note(note)
  )

  const promiseArray = noteObjects.map((note) => note.save())

  await Promise.all(promiseArray)
})

test("notes are returned as json", async () => {
  console.log("entered test")
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all notes are returned", async () => {
  const response = await api.get("/api/notes")

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes")
  const contents = response.body.map((e) => e.content)
  assert(contents.includes("HTML is easy"))
})

test("a valid note can be added", async () => {
  // const main = async () => {
  //   const notes = await Note.find({})
  //   console.log("the operation returned the following notes:", notes)

  //   const response = await notes[0].deleteOne()
  //   console.log("the first note is deleted", response)
  // }

  // main()

  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  }

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  // const response = await api.get("/api/notes")
  const contents = notesAtEnd.map((n) => n.content)

  // console.log(contents)

  assert(contents.includes("async/await simplifies making async calls"))
})

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  }

  await api.post("/api/notes").send(newNote).expect(400)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

test("a specific note can be viewed", async () => {
  const noteAtStart = await helper.notesInDb()

  const noteToView = noteAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test("a note can be deleted", async () => {
  const noteAtStart = await helper.notesInDb()
  const noteToDelete = noteAtStart[0]

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map((r) => r.content)
  assert(!contents.includes(noteToDelete.content))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})

after(async () => {
  await mongoose.connection.close
})
