const _ = require("lodash")
const dummy = (blog) => {
  return 1
}
const totalLikes = (blogs) => {
  console.log(blogs.length)
  if (!blogs || blogs.length === 0) {
    return 0
  }

  if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.reduce((sum, currBlog) => {
      console.log(currBlog.likes)
      return sum + currBlog.likes
    }, 0)
  }
}
const favouritesBlog = (blogs) => {
  const likesMax = Math.max(...blogs.map((blog) => blog.likes))
  console.log("likesMax", likesMax)
  const maxNum = blogs.find((blog) => blog.likes === likesMax)
  console.log("maxNum", maxNum.likes)
  return maxNum.likes
}

const mostBlogs = (blog) => {
  const getAuthor = _.reduce(blog, function (val, n) {
    return val > n.likes ? val : n
  })
  console.log(getAuthor)
  return { author: getAuthor.author, likes: getAuthor.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favouritesBlog,
  mostBlogs,
}
