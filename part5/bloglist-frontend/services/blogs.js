import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getBlogs = () => {
  if (!token) {
    console.log("Token is null")
    return
  }
  const config = {
    headers: { Authorization: token },
  }

  return axios
    .get(baseUrl, config)
    .then((res) => {
      console.log("Axios Response", res.data)
      return res.data
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

export default { getBlogs, setToken }
