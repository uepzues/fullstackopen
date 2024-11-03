const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  // console.log("Body:  ", request.body)
  console.log("---")
  next()
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
