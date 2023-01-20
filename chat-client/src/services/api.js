import axios from 'axios';
import { JWT_KEY } from '../data/config';
import { Storage } from '../utils/Storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = Storage.get(JWT_KEY);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
