import axios from 'axios';

export const baseURL = `${process.env.REACT_APP_API_BASE}/api/v1`;

const apiClient = axios.create({
  baseURL: baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
