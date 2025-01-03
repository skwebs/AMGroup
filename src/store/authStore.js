// src/store/authStore.js
import {create} from 'zustand';
import * as Keychain from 'react-native-keychain';

const useAuthStore = create(set => ({
  token: null, // Auth token state
  loading: true, // Loading state
  setToken: async newToken => {
    await Keychain.setGenericPassword('token', newToken); // Store token securely
    set({token: newToken});
  },
  getToken: async () => {
    const credentials = await Keychain.getGenericPassword();
    const token = credentials ? credentials.password : null;
    set({token, loading: false});
  },
  deleteToken: async () => {
    await Keychain.resetGenericPassword();
    set({token: null});
  },
}));
export default useAuthStore;
