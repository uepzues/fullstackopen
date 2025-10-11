import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
    minlength: 4,
  },
})
 
authorSchema.plugin(mongooseUniqueValidator)

const Author = mongoose.model('Author', authorSchema)

export default Author
