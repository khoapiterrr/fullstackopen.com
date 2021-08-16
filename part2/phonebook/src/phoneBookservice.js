import axios from 'axios';
const urlBase = 'http://localhost:3001/persons';
const api = {
  getAll: () => {
    return axios.get(urlBase);
  },
  getById: (id) => {
    return axios.get(urlBase + '/' + id);
  },
  deleteById: (id) => {
    return axios.delete(urlBase + '/' + id);
  },
  update: (id, data) => {
    return axios.put(urlBase + '/' + id, data);
  },
  create: (data) => {
    return axios.post(urlBase, data);
  },
};

export default api;
