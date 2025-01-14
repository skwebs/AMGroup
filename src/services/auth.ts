// import useAuthStore from '../store/authStore'; // Zustand store
import TokenService from '../services/tokenService'; // Token handling service
import API_ENDPOINTS from '../constants/apiEndpoints';
import API_BASE_URL from '../utils/config';
import axios, { axiosInstance } from '../utils/axios';
import deviceConfig from '../config/deviceConfig';
import useAuthStore from '../store/zustand/authStore';

// interface ValidationError {
//   message: string;
//   errors: {
//     [key: string]: string[];
//   };
// }

const AuthService = {

  register: async (
    registerInfo: {
      name: string;
      email: string;
      mobile: string;
      password: string;
      confirmPassword: string;
    }
  ): Promise<any> => {
    const { setAuthenticated } = useAuthStore.getState();

    const device_name = await deviceConfig.getDeviceId();

    const data = {
      name: registerInfo.name || '',
      mobile: registerInfo.mobile || '',
      email: registerInfo.email || '',
      password: registerInfo.password || '',
      password_confirmation: registerInfo.confirmPassword || '',
      device_name,
    };

    try {
      const response = await axios.post(`${API_BASE_URL + API_ENDPOINTS.REGISTER}`, data);
      const token = response.data.token;
      await TokenService.saveToken(token);
      setAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      if (error.response?.status === 422) {
        throw {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
        };
      }
      setAuthenticated(false);
      throw error;
    }
  },

  login: async (loginInfo: { email: string; password: string }): Promise<any> => {
    const { setAuthenticated } = useAuthStore.getState();

    try {
      const device_name = await deviceConfig.getDeviceId();
      const data = {
        email: loginInfo.email || '',
        password: loginInfo.password || '',
        device_name,
      };

      const response = await axios.post(`${API_BASE_URL + API_ENDPOINTS.LOGIN}`, data);
      const token = response.data.token;
      await TokenService.saveToken(token);
      setAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      if (error.response?.status === 422) {
        throw {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
        };
      }
      setAuthenticated(false);
      throw error;
    }
  },

  logout: async (): Promise<boolean> => {
    const { setAuthenticated } = useAuthStore.getState();

    try {
      await axios.post(`${API_BASE_URL + API_ENDPOINTS.LOGOUT}`);
      await TokenService.deleteToken();
      setAuthenticated(false);
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    const { setAuthenticated } = useAuthStore.getState();
    const token = await TokenService.getToken();

    const isAuthenticated = token !== null;
    setAuthenticated(isAuthenticated);
    return isAuthenticated;
  },

  getUserDetails: async (): Promise<any> => {
    const { setAuthenticated } = useAuthStore.getState();

    try {
      const response = await axios.get('/user'); // Use the custom instance for requests
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);

      // Use the core library for static methods
      if (axiosInstance.isAxiosError(error) && error.response?.status === 401) {
        setAuthenticated(false);
        await TokenService.deleteToken();
      }
      throw error;
    }
  },
};

export default AuthService;
