const mongoose = require("mongoose")
// require("dotenv").config()

const url = process.env.TEST_MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })
  console.log("connected to MongoDB", "from mongo.js")

  const Note = mongoose.model("Note", noteSchema)

  // noteSchema.set("toJSON", {
  //   transform: (document, ret) => {
  //     ret.id = ret._id.toString()
  //     delete ret._id
  //     delete ret.__v
  //   },
  // })

  Note.find({}).then((res) => {
    res.forEach((note) => {
      console.log("this is the note:", note)
    })
    mongoose.connection.close()
  })
})
//   .catch((err) => console.log("error connecting to DB", err))
