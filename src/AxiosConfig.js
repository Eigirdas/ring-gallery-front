// AxiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Automatically attach Authorization header
instance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.jwt) {
      config.headers.Authorization = `Bearer ${userData.jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;