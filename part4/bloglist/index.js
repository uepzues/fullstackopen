const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model("Blog", blogSchema)

const mongoUrl = `mongodb+srv://uepzues:<db_password>@zuesuep.8bkzlbx.mongodb.net/?retryWrites=true&w=majority&appName=zuesuep`