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
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    //create a user
    const saltRounds = 10
    const password = "password"

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: "kims",
      name: "Krimier",
      blogs: [],
      passwordHash,
    })

    await user.save()

    //create a blogs
    const blogObjects = blogHelper.blogList.map(
      (blog) =>
        new Blog({
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes || 0,
          user: user._id,
        })
    )

    blogObjects.map(async (blog) => {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
    })
    await user.save()

    // await Promise.all(promiseArray)
  })

  test("blogs are returned as json", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const contentHeader = res.get("Content-Type")

    assert.strictEqual(contentHeader, "application/json; charset=utf-8")
  })

  test("test for token", async () => {
    const newUser = {
      username: "kims",
      password: "password",
    }

    const res = await api.post("/api/login").send(newUser).expect(200)

    const token = res.body.token

    const newBlog = {
      title: "The best blog",
      author: "author",
      url: "url",
      likes: 0,
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    assert.ok(token)
  })

  test("add a blog", async () => {
    const newUser = {
      username: "kims",
      password: "password",
    }

    const res = await api.post("/api/login").send(newUser).expect(200)

    const token = res.body.token

    const newBlog = {
      title: "The best blog",
      url: "url",
      author: "author",
      likes: 0,
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogs = await blogHelper.blogListInDb()
    assert.strictEqual(blogs.length, blogHelper.blogList.length + 1)
  })

  test("delete a blog", async () => {
    const newUser = {
      username: "kims",
      password: "password",
    }

    const res = await api.post("/api/login").send(newUser).expect(200)

    const token = res.body.token

    const user = await User.findOne({ username: "kims" })

    const blog = await Blog.findOne({ user: user._id })

    await api
      .delete(`/api/blogs/${blog._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)
  })

  test("update a blog", async () => {
    const newUser = {
      username: "kims",
      password: "password",
    }

    const res = await api.post("/api/login").send(newUser).expect(200)

    const token = res.body.token

    const user = await User.findOne({ username: "kims" })

    const blog = await Blog.findOne({ user: user._id })

    const updatedBlog = {
      title: "New Title The best blog",
      url: "url",
      author: "author",
      likes: 0,
    }

    await api
      .put(`/api/blogs/${blog._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)

    const blog1 = await Blog.findById(blog._id)
    assert.strictEqual(blog1.title, updatedBlog.title)
  })

  test("duplicate username generates 400 error", async () => {
    await User.deleteMany({})

    for (let person of helper.userList) {
      await api.post("/api/users").send(person).expect(201)
    }

    const newUser = {
      username: "dave",
      name: "Dave Mitchell",
      password: "thenandthere",
    }

    const res = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    assert.strictEqual(res.body.error, "expected username to be unique")
  })

  test("empty username and/or password returns a 400 error", async () => {
    const newUser = {
      name: "Olive Oyl",
      password: "canofworms",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const newUser2 = {
      username: "olive",
      name: "Olive Oyl",
    }

    await api
      .post("/api/users")
      .send(newUser2)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const userInDB = await User.find({})
    // console.log("users", userInDB)
    assert.strictEqual(userInDB.length, 1)
  })

  test("all users are returned", async () => {
    for (let person of helper.userList) {
      await api.post("/api/users").send(person).expect(201)
    }

    const res = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    // console.log(res.body)

    assert.strictEqual(res.body.length, helper.userList.length + 1) //kims waws added
  })

  test("3 or less username/password characters returns a 400 error", async () => {
    const newUser = {
      username: "oyl",
      name: "Olive Oyl",
      password: "canofworms",
    }
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const newUser2 = {
      username: "oyl",
      name: "Olive Oyl",
      password: "canofworms",
    }
    await api
      .post("/api/users")
      .send(newUser2)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const userInDB = await User.find({})
    assert.strictEqual(userInDB.length, helper.userList.length - 1)
  })
})

after(async () => {
  await mongoose.disconnect()
})
