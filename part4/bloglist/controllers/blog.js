const blogRouter = require("express").Router()
const Blog = require("../models/blogModel")

blogRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogRouter.get("/:id", (req, res) => {
  const id = req.params.id
  console.log(id)

  Blog.findById(id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err.message)
      res.status(404).end
    })
})

blogRouter.post("/", (req, res) => {
  const { title, author, url, likes } = req.body

  const content = {
    title,
    author,
    url,
    likes,
  }

  const blog = new Blog(content)

  blog
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((err) => console.log(err.message))
})

blogRouter.delete("/:id", (req, res) => {
  const id = req.params.id

  Blog.findByIdAndDelete(id)
    .then((deletedPost) => {
      console.log("deleted post with id", deletedPost.id)
      res.status(204).end()
    })
    .catch((err) => {
      console.log("error deletign post", err.message)
      res.status(404).json({ error: err.message })
    })
})

module.exports = blogRouter
