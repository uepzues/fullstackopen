const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Note = require("../models/model")

const api = supertest(app)

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

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

test.only("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("there are two notes", async () => {
  const response = await api.get("/api/notes")

  assert.strictEqual(response.body.length, initialNotes.length)
})

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes")
  const contents = response.body.map((e) => e.content)
  assert(contents.includes("HTML is easy"))
})

test("a valid note can be added", async () => {
  const main = async () => {
    const notes = await Note.find({})
    // console.log("the operation returned the following notes:", notes)

    const response = await notes[0].deleteOne()
    // console.log("the first note is deleted", response)
  }

  main()

  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  }

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/notes")
  const contents = response.body.map((r) => r.content)

  console.log(contents)

  assert.strictEqual(response.body.length, initialNotes.length)

  assert(contents.includes("async/await simplifies making async calls"))
})

after(async () => {
  await mongoose.connection.close
})
