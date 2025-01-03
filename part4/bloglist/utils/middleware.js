const logger = require("./logger")

const requestLogger = (req, res) => {
  // const logger = require("./logger")
  console.log("Method", req.method)
  console.log("Path", req.path)
  // console.log("Body", req.body)
  console.log("---")
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
}
