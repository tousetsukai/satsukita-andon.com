import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.satsukita-andon.com/dev/',
  /* baseURL: 'http://localhost:6039/dev/', */
});

export default {
  getFestivals: () => api.get('/festivals'),
  getTopNews: () => api.get('/contents/news'),
  getClasses: (params) => api.get('/classes', { params }),
  getClass: (classId) => api.get(`/classes/${classId}`),
  getUser: (token) => api.get('/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  getToken: (login, password) => api.post('/auth/token', {
    login,
    password,
  }),
};
