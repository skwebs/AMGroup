import DeviceInfo from 'react-native-device-info'; // Or another library you're using

let cachedDeviceId = null;

const getDeviceId = async () => {
  if (cachedDeviceId) {
    return cachedDeviceId; // Return cached ID
  }
  try {
    const id = await DeviceInfo.getUniqueId(); // Retrieve device ID
    cachedDeviceId = id; // Cache the ID for future use
    return id;
  } catch (error) {
    console.error('Error retrieving device ID:', error);
    throw error;
  }
};

export default {
  getDeviceId,
};
