const _ = require('lodash')
const dummy = (blog) => 1
const totalLikes = (blogs) => {
  //   console.log(blogs.length)
  if (!blogs || blogs.length === 0) {
    return 0
  }

  if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.reduce((sum, currBlog) => sum + currBlog.likes, 0)
  }
}
const favouritesBlog = (blogs) => {
  const likesMax = Math.max(...blogs.map((blog) => blog.likes))
  //   console.log("likesMax", likesMax)
  const maxNum = blogs.find((blog) => blog.likes === likesMax)
  //   console.log("maxNum", maxNum.likes)
  return maxNum.likes
}
const mostBlogs = (blog) => {
  const getAuthors = _.countBy(blog, 'author')
  const getMost = _.reduce(_.keys(getAuthors), (x, y) =>
    getAuthors[y] > getAuthors[x] ? y : x,
  )
  //   console.log("author", getMost, "blogs", getAuthors[getMost])
  return { author: getMost, blogs: getAuthors[getMost] }
}
const mostLikes = (blogs) => {
  const authorLikes = {}

  _.forEach(blogs, (blog) => {
    const { author, likes } = blog
    // console.log("author", author)
    if (authorLikes[author]) {
      authorLikes[author] += likes
    } else {
      authorLikes[author] = likes
    }
  })
  // console.log("authorLikes", authorLikes)
  const getAuthor = _.reduce(
    _.keys(authorLikes),
    (x, y) => (authorLikes[x] > authorLikes[y] ? x : y),
    {},
  )
  // console.log('getAuthor', getAuthor)
  return { author: getAuthor, likes: authorLikes[getAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favouritesBlog,
  mostLikes,
  mostBlogs,
}
