const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/userModel")

userRouter.get("/", async (req, res) => {
  const result = await User.find({})
  res.json(result)
})

userRouter.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    console.error("error creating user", error)
    res
      .status(500)
      .json({ error: "something went wrong while creating a user" })
  }
})

module.exports = userRouter
