import axios from "axios"
const baseURL = "http://localhost:3003/api/notes"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  return axios.get(baseURL).then((response) => {
    // console.log(response);
    return response
  })
}

const create = (newObject) => {
  console.log("newObject:", newObject)
  if (!newObject || !newObject.content) {
    console.error("Error: Note content cannot be blank or empty")
    return Promise.reject("Note content cannot be blank or empty from create")
  }

  if (!token) {
    console.error("Error: User is not logged in")
    return Promise.reject("User is not logged in")
  }

  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseURL, newObject, config)
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating note:", error)
      // throw error
    })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then((response) => response.data)
}

const delNote = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(() => {
    console.log(`Deleted note with id ${id}`)
  })
}

export default {
  getAll,
  create,
  update,
  delNote,
  setToken,
}
