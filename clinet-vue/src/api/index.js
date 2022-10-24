import axios from 'axios';
import { getToken } from '@/utils/localStoarge';

const http = axios.create({
  baseURL: 'http://localhost:3001',
});

http.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = getToken();
    }
    return config;
  }
);

http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default http;