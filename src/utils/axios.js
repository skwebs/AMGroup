import axiosLib from 'axios';
import { getToken } from '../services/tokenServices';
import config from '../config';

const axios = axiosLib.create({
  baseURL: 'https://anshumemorial.in/finbook/api',
  // baseURL: config.API_URL + '/api',
  // baseURL: 'http://192.168.31.112:8000/api',
  // baseURL: 'http://10.0.2.2:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

axios.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token !== null) {
    req.headers.Authorization = `Bearer ${token}`;
    // req.headers.Authorization = `Bearer 1|RvzHQRNceutullThxKQroepdU6gRLXjbKSDUZc0ebd3f77a9`;
  }
  return req;
});

export default axios;
