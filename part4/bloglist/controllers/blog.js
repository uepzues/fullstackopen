const blogRouter = require("express").Router()
const Blog = require("../models/blogModel")

blogRouter.get("/", async (req, res) => {
  const result = await Blog.find({})
  res.json(result)
})

blogRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const result = await Blog.findById(id)

  if (result) {
    res.json(result)
  } else {
    res.status(404).send({ error: "blog not found" })
  }
})

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body

  const content = {
    title,
    author,
    url,
    likes: likes || 0,
  }

  const blog = new Blog(content)
  if (!title || !url) {
    return res.status(400).send({ error: "Title and URL required" })
  }

  const result = blog.save()
  return res.status(201).json(result)
})

blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const result = await Blog.findByIdAndDelete(id)

  if (!result) {
    return res.status(400).send({ error: "blog not found" })
  }
  console.log("deleted post with id", id)
  res.status(204).end()
})

module.exports = blogRouter
