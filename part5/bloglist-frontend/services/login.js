import axios from "axios"
const baseUrl = "/api/login"

const login = (credentials) => {
  return axios.post(baseUrl, credentials).then((res) => {
    // console.log("Creds", credentials, "RESDATA", res.data)
    return res.data
  })
}

export default { login }
