require("dotenv").config()

const PORT = process.env.PORT || 3003
const MONGODB_URI =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    ? process.env.DEV_MONGODB_URI
    : MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI,
}
