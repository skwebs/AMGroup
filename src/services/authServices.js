import axios from '../utils/axios';
import { getToken, setToken } from './tokenServices';

export async function login(credentials) {
  const { data } = await axios.post('/login', credentials);
  await setToken(data.token);
}

export async function register(registerInfo) {
  const { data } = await axios.post('/register', registerInfo);
  await setToken(data.token);
}

export async function loadUser() {
  if (await getToken()) {
    const { data: user } = await axios.get('/user');
    return user;
  }
  return null;
}

export async function logout() {
  await axios.post('logout', {});
  await setToken(null);
}

