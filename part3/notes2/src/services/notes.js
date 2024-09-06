import axios from "axios";
const baseURL = "./api/notes";

const getAll = () => {
  return axios
    .get(baseURL)
    .then((response) => response)
    .catch((e) => console.log(e));
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data).catch((e) => console.log(e));
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data).catch((e) => console.log(e));
};

const delNote = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request
    .then((response) => {
      console.log(response.data);
      console.log(`Deleted note with id ${id}`);
    })
    .catch((e) => console.log(e));
};

export default {
  getAll,
  create,
  update,
  delNote,
};
