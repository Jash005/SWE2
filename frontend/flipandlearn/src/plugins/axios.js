import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // from .env
});

export default api;
