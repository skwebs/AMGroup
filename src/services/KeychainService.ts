import * as Keychain from 'react-native-keychain';

const KeychainService = {
  /**
   * Save credentials (e.g., auth token)
   * @param key - The key to identify the data (e.g., "auth-token")
   * @param value - The value to store (e.g., token string)
   */
  save: async (key: string, value: string): Promise<boolean> => {
    try {
      await Keychain.setGenericPassword(key, value, {
        service: key,
      });
      return true;
    } catch (error) {
      console.error('Error saving data to Keychain:', error);
      return false;
    }
  },

  /**
   * Retrieve credentials (e.g., auth token)
   * @param key - The key to retrieve the data
   */
  get: async (key: string): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: key });
      return credentials ? credentials.password : null;
    } catch (error) {
      console.error('Error retrieving data from Keychain:', error);
      return null;
    }
  },

  /**
   * Delete credentials
   * @param key - The key of the data to delete
   */
  delete: async (key: string): Promise<boolean> => {
    try {
      await Keychain.resetGenericPassword({ service: key });
      return true;
    } catch (error) {
      console.error('Error deleting data from Keychain:', error);
      return false;
    }
  },
};

export default KeychainService;
