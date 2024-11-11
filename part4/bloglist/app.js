const config = require("./utils/config")
const middleware = require("./utils/middleware")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blog")
const logger = require("./utils/logger")

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to DB")
  })
  .catch((err) => logger.error("error connecting to DB", err.message))

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))
app.use("/api/blogs", blogRouter)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
