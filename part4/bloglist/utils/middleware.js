const requestLogger = (req, res) => {
  const logger = require("./logger")
  console.log("Method", req.method)
  console.log("Path", req.path)
  console.log("Body", req.body)
  console.log("---")
}

const errorHandler = (err, req, res, next)=>{
   logger.err(err.message) 
}
