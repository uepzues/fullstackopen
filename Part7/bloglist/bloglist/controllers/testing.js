const router = require('express').Router()
const Note = require('../models/blogModel')
const User = require('../models/userModel')

router.post('/reset', async (req, res) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = router
