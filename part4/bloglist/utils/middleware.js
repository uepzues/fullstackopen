const logger = require("./logger")

const requestLogger = (req, res) => {
  // const logger = require("./logger")
  console.log("Method", req.method)
  console.log("Path", req.path)
  // console.log("Body", req.body)
  console.log("---")
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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
}
