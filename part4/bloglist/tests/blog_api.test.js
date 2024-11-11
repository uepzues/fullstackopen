const { test, after, beforeEach } = require("node:test")
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



after(async () => {
  await mongoose.connection.close
})
