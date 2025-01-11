import Config from 'react-native-config';

// base urls
export const BASE_URL_LOCAL = Config.BASE_URL_LOCAL;
export const BASE_URL_LOCAL_IP = Config.BASE_URL_LOCAL_IP;
export const BASE_URL_SERVER = Config.BASE_URL_SERVER;

// api urls
export const API_URL_LOCAL = `${BASE_URL_LOCAL}/api`;
export const API_URL_LOCAL_IP = `${BASE_URL_LOCAL_IP}/api`;
export const AMA_GROUP_API_URL = `${BASE_URL_SERVER}/ama-group/api`;
export const FINBOOK_API_URL = `${BASE_URL_SERVER}/finbook/api`;

// this is the current API_URL for the project
const API_BASE_URL = FINBOOK_API_URL;
export default API_BASE_URL;
