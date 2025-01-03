// create a function storeToken to store token using react-native-keychain
import * as Keychain from 'react-native-keychain';

// create a function setToken to store token using react-native-keychain
export async function setToken(token) {
  return await Keychain.setGenericPassword('token', token);
}

// create a function getToken to get token using react-native-keychain, first check if it exists then return the token if it doesn't exist then return null
export async function getToken() {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}

// create a function deleteToken to delete token using react-native-keychain fist check token exists or not. if token is existing then delete it. if token is not existing then return null
export async function deleteToken() {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return await Keychain.resetGenericPassword();
  }
  return null;
}

// check token exists or not
export async function hasToken() {
  const credentials = await Keychain.getGenericPassword();
  return credentials !== false;
}

// export async function deleteToken() {
//   return await Keychain.resetGenericPassword();
// }
// create a function setUserData to store user data using react-native-keychain
export async function setUserData(userData) {
  await Keychain.setGenericPassword('userData', JSON.stringify(userData));
}
// create a function getUserData to get user data using react-native-keychain
export async function getUserData() {
  const credentials = await Keychain.getGenericPassword();
  return JSON.parse(credentials.password);
}
// create a function deleteUserData to delete user data using react-native-keychain
export async function deleteUserData() {
  await Keychain.resetGenericPassword();
}
