import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAllPersons = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
    .then(response => response.data);
};

const services = {
  getAllPersons,
  addPerson,
  deletePerson,
  updatePerson,
};

export default services;
