const blogRouter = require("express").Router()
const Blog = require("../models/blogModel")
const User = require("../models/userModel")

blogRouter.get("/", async (req, res) => {
  const result = await Blog.find({}).populate("user", { username: 1, name: 1 })
  res.json(result)
})

blogRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  const result = await Blog.findById(id)

  if (result) {
    res.status(200).json(result)
  } else {
    res.status(404).send({ error: "blog not found" })
  }
})

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes, userId } = req.body

  const user = await User.findById(userId)
  const content = {
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  }

  const blog = new Blog(content)
  if (!title) {
    return res.status(400).send({ error: "Title required" })
  }

  if (!url) {
    return res.status(400).send({ error: "URL required" })
  }

  const result = blog.save()
  // add blog id to user
  user.blogs = user.blogs.concat(blog._id)
  console.log(user.blogs)
  await user.save()
  return res.status(201).json(result)
})

blogRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, author, url, likes } = req.body
  const blogPost = {
    title,
    author,
    url,
    likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogPost, {
    new: true,
    runValidators: true,
    overwrite: true,
    context: "query",
  })
  // logger.info("inside put", updatedBlog)

  if (!updatedBlog) {
    return res.status(400).send({ error: "blog not found" })
  }

  return res.status(200).json(updatedBlog)
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
