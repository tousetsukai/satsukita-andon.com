import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5927/dev/',
});

export default {
  getFestivals: () => api.get('/festivals'),
  getTopNews: () => api.get('/contents/news'),
  getClasses: (params) => api.get('/classes', { params }),
  getClass: (classId) => api.get(`/classes/${classId}`),
};
