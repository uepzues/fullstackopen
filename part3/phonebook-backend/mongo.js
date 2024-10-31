const mongoose = require("mongoose")

require("dotenv").config()

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length > 2,
      message: (message) => `${message.value} is too short!`,
    },
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /\d{2,3}-\d{7,}/.test(v),
      message: (message) => `${message.value} is not a valid phone number!`,
    },
  },
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    console.log("before transform", returnedObject)

    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v

    console.log(returnedObject)
  },
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person
