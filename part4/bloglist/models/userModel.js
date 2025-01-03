const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: String,
  name: String,
})

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  },
})

const User = new mongoose.model("User", userSchema)

module.exports = User
