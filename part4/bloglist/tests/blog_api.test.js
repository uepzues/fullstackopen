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

test.only("returns the uid as 'id'", async () => {
  const result = await api.get("/api/blogs")

  const ids = Object.keys(result.body[0])

  assert.strictEqual(ids.includes("id") && !ids.includes("_id"), true)

  console.log(result.body)
})

after(async () => {
  await mongoose.connection.close
})
