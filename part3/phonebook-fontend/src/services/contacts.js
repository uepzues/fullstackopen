import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getContacts = () => axios.get(baseUrl).then((response) => response);

const create = (data) => {
  const request = axios.post(baseUrl, data);
  return request.then((res) => res.data);
};

const update = (id, data) => {
  const request = axios.patch(`${baseUrl}/${id}`, data);
  console.log(id);
  return request.then((res) => res.data);
};

const delContact = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => {
    return res.data;
  });
};

export default {
  getContacts,
  create,
  update,
  delContact,
};
