const User = require('../models/userModel')

const userList = [
  {
    username: 'dave',
    name: 'David Pollow',
    password: 'california',
  },
  {
    username: 'hale',
    name: 'Haley Merry',
    password: 'ziplog',
  },
]

const userListInDb = async () => {
  const list = await User.find({})

  return list.map((user) => {
    user.toJSON()
  })
}

module.exports = {
  userList,
  userListInDb,
}
