const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCheck =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCheck)) {
    console.log('from loginrouter cred failed')
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userToken, process.env.SECRET)

  return res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
