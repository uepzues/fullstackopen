import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getConfig = () => {
  // console.log(token)
  return { headers: { Authorization: token } }
}

const getBlogs = () => {
  if (!token) {
    throw new Error('Authorization token is missing. Please log in.')
  }
  return axios
    .get(baseUrl, { headers: { Authorization: token } })
    .then((res) => {
      // console.log("Axios Response", res.data)
      return res.data
    })
    .catch((err) => {
      console.log('Error', err)
    })
}

const createBlog = (blog) => {
  return axios
    .post(baseUrl, blog, getConfig())
    .then((res) => {
      // console.log('Axios Create', res.data)
      return res.data
    })
    .catch((err) => {
      console.log('Error', err)
      throw new Error(err.response?.data?.error || 'Failed to create blog.')
    })
}

const updateBlog = (id, blog) => {
  return axios
    .put(`${baseUrl}/${id}`, blog, getConfig())
    .then((res) => {
      // console.log("Axios Update", res.data)
      return res.data
    })
    .catch((err) => {
      console.log('Error', err)
      throw new Error(err.response?.data?.error || 'Failed to update blog.')
    })
}

const updateBlogComments = (blog) => {
  return axios
    .put(`${baseUrl}/${blog.id}/comments`, blog, getConfig())
    .then((res) => {
      // console.log("Axios Update", res.data)
      return res.data
    })
    .catch((err) => {
      console.log('Error', err)
      throw new Error(err.response?.data?.error || 'Failed to update blog.')
    })
}

const removeBlog = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`, getConfig())
    .then((res) => {
      // console.log("Axios Delete", res.data)
      return res.data
    })
    .catch((err) => {
      console.log('Error', err)
      throw new Error(err.response?.data?.error || 'Failed to delete blog.')
    })
}

export default {
  getBlogs,
  setToken,
  createBlog,
  updateBlog,
  removeBlog,
  updateBlogComments,
}
