const mongoose = require("mongoose")

const password = process.env.VITE_MONGODB_URI_PW
const username = process.env.VITE_MONGODB_URI_USERNAME

const url = `mongodb+srv://${username}:${password}@zuesuep.8bkzlbx.mongodb.net/fullstackopen?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)

mongoose
  .connect(url)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("error connecting to DB", err))

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set("toJSON", {
  transform: (document, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Note = mongoose.model("Note", noteSchema)

module.exports = Note