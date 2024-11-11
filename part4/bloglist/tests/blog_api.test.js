const { test, after, describe, beforeEach } = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const blogHelper = require("./blogList_helper")
const app = require("../app")
const mongoose = require("mongoose")
const api = supertest(app)
const Blog = require("../models/blogModel")

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log("DB cleared")

  for (const blog of blogHelper.blogList) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
test("list are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("returns the correct amount of blog post", async () => {
  console.log("test")

  const result = await api.get("/api/blogs")

  assert.strictEqual(result.body.length, blogHelper.blogList.length)
})

test("returns the uid as 'id'", async () => {
  const result = await api.get("/api/blogs")

  const ids = Object.keys(result.body[0])

  assert.strictEqual(ids.includes("id") && !ids.includes("_id"), true)
})

test("successfuly creates a post", async () => {
  const newPost = {
    title: "This is a new title",
    author: "Balthazar Wulf",
    likes: 1,
    url: "http://localhost/post",
  }

  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const posts = await blogHelper.blogListInDb()

  assert.strictEqual(posts.length, blogHelper.blogList.length + 1)

  const savedPost = posts.find((post) => {
    return post.title === newPost.title
    post.author === newPost.author && post.url === newPost.url
  })

  //   console.log(savedPost)
  assert.equal(Boolean(savedPost), true)
})

test.only("likes property is missing", async () => {
  const newPost = {
    title: "This is a new title",
    author: "Balthazar Wulf",
    url: "http://localhost/post",
  }

  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const savedPost = await blogHelper.blogListInDb()
  const keys = Object.keys(savedPost[savedPost.length - 1])
  console.log(keys)

  assert.strictEqual(!keys.includes("likes"), true)
})

after(async () => {
  await mongoose.connection.close
})
