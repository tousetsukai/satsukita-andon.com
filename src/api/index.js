import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.satsukita-andon.com/dev/',
  /* baseURL: 'http://localhost:6039/dev/', */
});

export default {
  getFixedContent: (type) => api.get(`/contents/${type}`),
  getFestivals: () => api.get('/festivals'),
  getTopNews: () => api.get('/contents/news'),
  getClasses: (params) => api.get('/classes', { params }),
  getClass: (classId) => api.get(`/classes/${classId}`),
  getArticles: (params) => api.get('/articles', { params }),
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
