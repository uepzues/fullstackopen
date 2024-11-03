const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const PORT = process.env.PORT || 3004

app.use(cors())

app.use(express.static("dist"))

app.use(express.json())

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const mongoUrl = process.env.NODE_ENV

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to DB")
  })
  .catch((err) => console.log("error connecting to DB", err.message))

const Blog = mongoose.model("Blog", blogSchema)

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  },
})

app.get("/", (req, res) => {
  res.send("Blog List")
})

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs))
})

app.get("/api/blogs/:id", (req, res) => {
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

app.post("/api/blogs", (req, res) => {
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

app.delete("/api/blogs/:id", (req, res) => {
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

app.listen(PORT, () => {
  console.log("server running on port", PORT)
})
