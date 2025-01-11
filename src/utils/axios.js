import axiosInstance from 'axios';
import {URL} from '../config/app';
import {useNetworkStore} from '../store/zustand/networkStore';
import TokenService from '../services/tokenService';

// Create custom axios instance
const axios = axiosInstance.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
  },
});

// Add request interceptor for token and network checks
axios.interceptors.request.use(
  async req => {
    const isConnected = useNetworkStore.getState().isConnected;
    if (!isConnected) {
      return Promise.reject(new Error('No internet connection'));
    }

    try {
      const token = await TokenService.getToken();
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    } catch (error) {
      console.error('Error getting token:', error);
      return Promise.reject(error);
    }
  },
  error => Promise.reject(error),
);

// Export both the custom instance and the core axios library
export {axiosInstance}; // Core library for static methods like isAxiosError
export default axios; // Custom instance for configured requests
