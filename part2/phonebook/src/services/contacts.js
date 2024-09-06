import axios from "axios";

const baseUrl = "http://localhost:3003/api/persons";

const getContacts = () =>
  axios
    .get(baseUrl)
    .then((response) => response)
    .catch((err) => console.log(err));

const create = (data) => {
  const request = axios.post(baseUrl, data);
  return request.then((res) => res.data);
};

const update = (id, data) => {
  const request = axios.patch(`${baseUrl}/${id}`, data);
  return request.then((res) => res.data);
};

const delContact = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req
    .then((res) => {
      return res.data, console.log(`${id} deleted`);
    })
    .catch((err) => console.log(err.message));
};

export default {
  getContacts,
  create,
  update,
  delContact,
};
