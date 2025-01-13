const mongoose = require("mongoose")
const { describe, beforeEach, test, after } = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const app = require("../app")
const helper = require("../tests/test_helper")
const bcrypt = require("bcrypt")
const User = require("../models/user")

const api = supertest(app)

describe.only("when there is initially one user in db", () => {
  // beforeAll(async () => {})

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test.only("creation succeeds with a fresh username", async () => {
    const userAtStart = await helper.usersInDb()
    const newUser = {
      username: "krimier",
      name: "Krimier Sanz",
      password: "zuesuep",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test.only("creation fails with proper statuscode and message if username already taken", async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "zuesuep",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes("expected 'username' to be unique"))

    assert.strictEqual(usersAtEnd.length, userAtStart.length)
  })
})
after(async () => {
  await mongoose.connection.close()
})
