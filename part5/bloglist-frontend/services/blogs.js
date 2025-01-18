import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getConfig = () => ({
  headers: { Authorization: token },
})

const getBlogs = () => {
  if (!token) {
    throw new Error("Authorization token is missing. Please log in.")
  }
  return axios
    .get(baseUrl, getConfig())
    .then((res) => {
      console.log("Axios Response", res.data)
      return res.data
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

const createBlog = (blog) => {
  return axios
    .post(baseUrl, blog, getConfig())
    .then((res) => {
      console.log("Axios Response", res.data)
      return res.data
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

export default { getBlogs, setToken, createBlog }
