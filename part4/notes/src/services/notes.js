import axios from "axios";
const baseURL = "http://localhost:3003/api/notes";

const getAll = () => {
  return axios.get(baseURL).then((response) => {
    console.log(response);
    return response;
  });
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data);
};

const delNote = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => {
    console.log(response.data);
    console.log(`Deleted note with id ${id}`);
  });
};

export default {
  getAll,
  create,
  update,
  delNote,
};
