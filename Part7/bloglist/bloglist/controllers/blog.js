const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

blogRouter.get('/', async (req, res) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(result)
})

blogRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  let result = new mongoose.Types.ObjectId(id)

  result = await Blog.findById(result)
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(404).json({ error: 'blog not found' })
  }
})

blogRouter.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ error: 'user missing' })
  }
  const { title, author, url, likes } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Title required' })
  }

  if (!author) {
    return res.status(400).json({ error: 'Author required' })
  }

  const content = {
    title,
    author,
    url,
    likes: likes || 0,
    user: req.user._id,
  }
  console.log(req.user)

  const blog = new Blog(content)

  const result = await blog.save()
  // add blog id to user
  req.user.blogs.concat(blog._id)
  await req.user.save()
  return res.status(201).json(result)
})

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params
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
    context: 'query',
  })

  if (!updatedBlog) {
    return res.status(400).json({ error: 'blog not found' })
  }

  return res.status(200).json(updatedBlog)
})

blogRouter.delete('/:blogId', async (req, res) => {
  const { blogId } = req.params
  const { user } = req
  console.log('blogrouter', user)
  if (!user) {
    return res.status(401).json({ error: 'unauthorized missing/invalid token' })
  }

  const blog = await Blog.findById(blogId)

  if (blogId.toString() === blog._id.toString()) {
    // console.log("id match")

    await Blog.findByIdAndDelete(blogId)

    // console.log("deleted post with id", blogId)
    return res.status(204).end()
  } else {
    return res.status(500).json({ error: 'error deleting blog' })
  }
})

module.exports = blogRouter
