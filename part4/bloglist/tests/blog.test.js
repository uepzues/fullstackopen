const { describe, beforeEach, test, after } = require("node:test")
const assert = require("node:assert")
const User = require("../models/userModel")
const Blog = require("../models/blogModel")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("../tests/userList_helper")
const blogHelper = require("../tests/blogList_helper")
const bcrypt = require("bcrypt")
const logger = require("../utils/logger")

const api = supertest(app)

describe("4.23", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const password = "password"
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: "kims",
      name: "Krimier",
      blogs: [],
      passwordHash,
    })

    await user.save()

    const blogList = blogHelper.blogList.map((blog) => {
      return new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes || 0,
        user: user._id,
      })
    })

    for (let blog of blogList) {
      await blog.save()
      user.blogs.push(blog._id)
    }
    logger.info("INSIDE BEach")
    await user.save()
  })

  describe("test", () => {
    test("recieves a token", async () => {
      const res = await api
        .post("/")
        .send({
          username: "kims",
          password: "password",
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const token = res.body.token
      console.log("INSIDE TEST")
      // assert(token, "should be defined")
      assert.strictEqual(token.includes("Bearer"), true)
    })
  })
})

// describe("When there are users saved", () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

//     for (let person of helper.userList) {
//       await api.post("/api/users").send(person).expect(201)
//     }
//   })

//   test("users are returned as json", async () => {
//     await api
//       .get("/api/users")
//       .expect(200)
//       .expect("Content-Type", /application\/json/)
//   })

//   test("all users are returned", async () => {
//     const res = await api
//       .get("/api/users")
//       .expect(200)
//       .expect("Content-Type", /application\/json/)

//     assert.strictEqual(res.body.length, helper.userList.length)
//   })

//   describe("adding new users", () => {
//     test("duplicate username generates 400 error", async () => {
//       const newUser = {
//         username: "dave",
//         name: "Dave Mitchell",
//         password: "thenandthere",
//       }

//       const res = await api
//         .post("/api/users")
//         .send(newUser)
//         .expect(400)
//         .expect("Content-Type", /application\/json/)

//       assert.strictEqual(res.body.error, "expected username to be unique")
//     })

//     test("empty username and/or password returns a 400 error", async () => {
//       const newUser = {
//         name: "Olive Oyl",
//         password: "canofworms",
//       }
//       await api
//         .post("/api/users")
//         .send(newUser)
//         .expect(400)
//         .expect("Content-Type", /application\/json/)

//       const newUser2 = {
//         username: "olive",
//         name: "Olive Oyl",
//       }
//       await api
//         .post("/api/users")
//         .send(newUser2)
//         .expect(400)
//         .expect("Content-Type", /application\/json/)

//       const userInDB = await helper.userListInDb()
//       assert.strictEqual(userInDB.length, helper.userList.length)
//     })

//     test("3 or less username/password characters returns a 400 error", async () => {
//       const newUser = {
//         username: "oyl",
//         name: "Olive Oyl",
//         password: "canofworms",
//       }
//       await api
//         .post("/api/users")
//         .send(newUser)
//         .expect(400)
//         .expect("Content-Type", /application\/json/)

//       const newUser2 = {
//         username: "oyl",
//         name: "Olive Oyl",
//         password: "canofworms",
//       }
//       await api
//         .post("/api/users")
//         .send(newUser2)
//         .expect(400)
//         .expect("Content-Type", /application\/json/)

//       const userInDB = await helper.userListInDb()
//       assert.strictEqual(userInDB.length, helper.userList.length)
//     })
//   })
// })

after(async () => {
  await mongoose.connection.close()
})
