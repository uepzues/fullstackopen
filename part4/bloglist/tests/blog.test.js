const { describe, beforeEach, before, test, after } = require("node:test")
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
  let token //save token here
  beforeEach("token", async () => {
    await User.deleteMany()
    await Blog.deleteMany()

    //create user
    const saltRounds = 10
    const password = "password"

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const blogUser = {
      username: "kims",
      name: "Krimier",
      blogs: [],
      passwordHash,
    }

    await blogUser.save()

    const blogUsers = await User.find({})
    const blogUser1 = blogUsers[0]

    // create blogs
    const blogPosts = blogHelper.blogList.forEach((blog) => {
      new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes || 0,
        user: blogUser1._id,
      })
    })

    for (let blog of blogPosts) {
      await blog.save()
      blogUser.blogs = blog.push(blog._id)
      await blogUser.save()
    }
  })

  describe("test for token", () => {
    test("token exists", async () => {
      const req = await api
        .post("/api/login")
        .send({ username: "kims", password: "password" })
        .expect(200)
        .expect("Content-Type", /application\/json/)
      token = req.body.token
      console.log("Token", req.body)
      assert(req.body.token, "token recieved")
    })

    test("adding post with token succeeds", async () => {

      // const tokenReq = await api
      //   .post("/api/login")
      //   .send({ username: "kims", password: "password" })
      //   .expect(200)
      //   .expect("Content-Type", /application\/json/)

console.log("asdfasdf", token);
      const req = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token.toString()}`)
        .send({
          title: "This is a test title",
          author: "testauthor",
          url: "testurl",
          likes: 12,
        })
        .expect(201)
        .expect("Content-Type", /application\/json/)


        console.log("test for post token", req.body);
      assert(req.body)
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
