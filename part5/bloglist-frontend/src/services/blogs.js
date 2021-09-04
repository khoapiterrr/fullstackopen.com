import axios from 'axios';
const baseUrl = '/api/blogs';

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const infoUser = window.localStorage.getItem('infoUser');
    if (infoUser) {
      config.headers['Authorization'] = 'Bearer ' + JSON.parse(infoUser).token;
    }
    return config;
  },

  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const login = (data) => {
  const request = axios.post('/api/login', data);
  return request.then((response) => response.data);
};
const createBlog = (data) => {
  const request = axios.post(baseUrl, data);
  return request.then((response) => response.data);
};
const likeBlog = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, {
    likes: blog.likes + 1,
  });
  return request.then((response) => response.data);
};
const deleteBlog = (blog) => {
  const request = axios.delete(baseUrl + `/${blog.id}`);
  return request.then((response) => response.data);
};
export default { getAll, login, createBlog, likeBlog, deleteBlog };
