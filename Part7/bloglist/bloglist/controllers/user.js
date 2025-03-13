const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

userRouter.get('/', async (req, res) => {
  const result = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    author: 1,
    likes: 1,
  })
  res.json(result)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password needed' })
  }
  if (username.length <= 3 || password.length <= 3) {
    return res
      .status(400)
      .json({ error: 'username and password must be more than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  return res.status(201).json(savedUser)
})

module.exports = userRouter
