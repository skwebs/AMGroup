import KeychainService from './KeychainService'; // Import the KeychainService

const TOKEN_KEY = 'auth_token';

const TokenService = {
  /**
   * Save the authentication token
   * @param token - The token string to store
   */
  saveToken: async (token: string): Promise<boolean> => {
    return await KeychainService.save(TOKEN_KEY, token);
  },

  /**
   * Retrieve the authentication token
   */
  getToken: async (): Promise<string | null> => {
    return await KeychainService.get(TOKEN_KEY);
  },

  /**
   * Delete the authentication token
   */
  deleteToken: async (): Promise<boolean> => {
    return await KeychainService.delete(TOKEN_KEY);
  },

  /**
   * Check if a token exists
   */
  hasToken: async (): Promise<boolean> => {
    const token = await TokenService.getToken();
    return token !== null;
  },
};

export default TokenService;
