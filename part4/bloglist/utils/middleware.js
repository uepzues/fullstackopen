const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const mongoose = require("mongoose")

const requestLogger = (req, res, next) => {
  // const logger = require("./logger")
  console.log("Method", req.method)
  console.log("Path", req.path)
  // console.log("Body", req.body)
  console.log("---")
  next()
}

const errorHandler = (err, req, res, next) => {
  // logger.error(err.message)
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ error: "malformatted id", message: err.message })
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  }
  if (err.name === "MongoServerError" && err.message.includes("E11000")) {
    return res.status(400).json({ error: "expected username to be unique" })
  }
  if (err.name === "JsonWebtokenError") {
    return res.status(401).json({ error: "token invalid" })
  }
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")

  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "")

    logger.info(req.token)
    return next()
  }
  req.token = null
  return next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    req.user = null
    return next()
  } else {
    let token = jwt.verify(req.token, process.env.SECRET)

    token = new mongoose.Types.ObjectId(token.id)

    if (token.id) {
      req.user = await User.findById(token)
      return next()
    } else {
      req.user = null
      return next()
    }
  }
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
}
