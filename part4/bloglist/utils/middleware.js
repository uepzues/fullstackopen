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
  // if (err) {
  //   return res.status(400).json({ error: err.message })
  // }
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")

  // console.log("tokenExtractor check", req.body)

  if (authorization && authorization.startsWith("Bearer")) {
    req.token = authorization.replace("Bearer ", "")

    // console.log("tokenExtractor: there is a authorization header")
  } else if (!authorization) {
    req.token = null
    // console.log("token null")
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    // console.log("userExtractor: no token")

    req.user = null
    return next()
  } else {
    const token = jwt.verify(req.token, process.env.SECRET)

    const tokenId = new mongoose.Types.ObjectId(token.id)
    // logger.info("midware token", token)
    if (tokenId) {
      // console.log("userExtractor", tokenId)

      req.user = await User.findById(tokenId)

      return next()
    } else {
      // console.log("userExtractor no token")

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
