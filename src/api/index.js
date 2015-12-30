import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5927/dev/'
});

export default {
  getFestivals: api.get('/festivals')
};
