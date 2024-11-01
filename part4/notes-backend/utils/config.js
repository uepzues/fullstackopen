require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.NODE_ENV

module.exports = {
    PORT,
    MONGODB_URI
}