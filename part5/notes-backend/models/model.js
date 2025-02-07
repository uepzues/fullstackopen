const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, minlength: 5 },
    important: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

noteSchema.set('toJSON', {
  transform: (document, ret) => {
    ret.id = ret._id.toString()
    ret.createdAt = ret.createdAt.toISOString()
    ret.updatedAt = ret.updatedAt.toISOString()
    delete ret._id
    delete ret.__v
  },
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
