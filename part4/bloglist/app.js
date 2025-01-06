const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/user")
const loginRouter = require("./controllers/login")
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to DB")
  })
  .catch((err) => logger.error("error connecting to DB", err.message))

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))
app.use(middleware.tokenExtractor)
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
