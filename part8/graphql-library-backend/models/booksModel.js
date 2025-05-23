import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [
    {
      type: String,
    },
  ],
})
bookSchema.plugin(mongooseUniqueValidator)

const Book = mongoose.model('Book', bookSchema)
export default Book
