import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5bb10a3e26a6.ngrok.io'
});

export default api;
