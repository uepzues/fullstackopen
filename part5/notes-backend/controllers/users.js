const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    important: 1,
  })

  res.json(users)
})

userRouter.post("/", async (req, res) => {
  const { username, name, password, id } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.findById(id)

  const notes = new User({
    username,
    name,
    passwordHash,
  })

  const savedNote = await notes.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  res.status(201).json(savedNote)
})

module.exports = userRouter
