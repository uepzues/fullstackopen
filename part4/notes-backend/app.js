const config = require("./utils/config")
const cors = require("cors")
const express = require("express")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const notesRouter = require("./controllers/note")
const mongoose = require("mongoose")

const app = express()
const url = config.MONGODB_URI

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose
  .connect(url)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("error connecting to DB", err.message))

app.use(cors())

app.use(express.static("dist"))

app.use(express.json())

app.use(middleware.requestLogger)

app.use("/api/notes", notesRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
