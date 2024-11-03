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

module.exports = {
  dummy,
  totalLikes,
}
