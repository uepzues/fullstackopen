const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true, minlength: 5 },
  important: Boolean,
  user: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
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
