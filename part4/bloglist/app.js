const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blog")

require("dotenv").config()

const app = express()

const mongoUrl = process.env.NODE_ENV

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to DB")
  })
  .catch((err) => console.log("error connecting to DB", err.message))

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))
app.use("/api/blogs", blogRouter)

module.exports = app
