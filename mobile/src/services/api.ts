import axios from 'axios';

const api = axios.create({
  baseURL: 'https://1e598822b589.ngrok.io'
});

export default api;
