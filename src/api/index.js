import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://api.satsukita-andon.com/dev/',
  /* baseURL: 'http://localhost:6039/dev/', */
});

const tokenHeader = () => {
  const token = Cookies.get('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
};

export default {
  getFixedContent: (type) => api.get(`/contents/${type}`),
  getFestivals: () => api.get('/festivals'),
  getTopNews: () => api.get('/contents/news'),
  getClasses: (params) => api.get('/classes', { params }),
  getClass: (classId) => api.get(`/classes/${classId}`),
  getReviews: (classId) => api.get(`/classes/${classId}/reviews`),
  getClassArticles: (classId) => api.get(`/classes/${classId}/articles`),
  getClassArticle: (id) => api.get(`/class-articles/${id}`),
  getClassResources: (classId) => api.get(`/classes/${classId}/resources`),
  getClassResource: (id) => api.get(`/class-resources/${id}`),
  getImages: (classId, offset) => api.get(`/classes/${classId}/images`, {
    params: {
      offset: offset,
      limit: 24,
    },
  }),
  getArticles: (params) => api.get('/articles', { params }),
  getArticle: (id) => api.get(`/articles/${id}`),
  getResources: (params) => api.get('/resources', { params }),
  getResource: (id) => api.get(`/resources/${id}`),
  getMe: (token) => api.get('/auth/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  getToken: (login, password) => api.post('/auth/token', {
    login,
    password,
  }),
  getUser: (login) => api.get(`/users/${login}`),
  postUser: (login, password, name, times) => api.post('/users', {
    login, password, name, times,
  }),
  putMe: (params) => api.put('/users', params, tokenHeader()),
  postImage: (image) => {
    const data = new FormData();
    data.append('file', image);
    return api.post('/file/images', data, tokenHeader());
  },
  postIcon: (image) => {
    const data = new FormData();
    data.append('file', image, 'icon.png'); // must be a png image. FIXME
    return api.post('/file/icon', data, tokenHeader());
  },
};
