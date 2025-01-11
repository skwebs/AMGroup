import {useState, useEffect} from 'react';
import deviceConfig from '../config/deviceConfig';

const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        const id = await deviceConfig.getDeviceId();
        setDeviceId(id);
      } catch (error) {
        console.error('Error retrieving device ID:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceId();
  }, []);

  return {deviceId, loading};
};

export default useDeviceId;
