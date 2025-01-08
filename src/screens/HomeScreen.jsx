import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import {API_URL} from '../utils/config';
import {API_ENDPOINTS} from '../constants/apiEndpoints';
import {ROUTES} from '../constants/route';

const HomeScreen = ({navigation}) => {
  const {deleteToken, token} = useAuthStore(); // Assuming you have a token in your store
  const [user, setUser] = useState(null); // Store user details
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) {
        return;
      } // If no token, don't fetch user data

      setLoading(true); // Start loading
      try {
        const response = await axios.get(`${API_URL}${API_ENDPOINTS.USER}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data); // Set user data
      } catch (err) {
        setError('Failed to fetch user details'); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserDetails();
  }, [token]); // Re-run when token changes

  // Logout handler
  const handleLogout = async () => {
    try {
      // Send logout request to server to delete token
      if (token) {
        await axios.post(
          `${API_URL}${API_ENDPOINTS.LOGOUT}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      // Clear local token
      await deleteToken();
      console.log('Logged out successfully');
    } catch (err) {
      console.error('Error during logout', err);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Show error if any */}
      {/* Display user details if available */}

      <Button title="Logout" onPress={handleLogout} />

      {user ? (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userDetailText}>Name: {user.name}</Text>
          <Text style={styles.userDetailText}>Email: {user.email}</Text>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate(ROUTES.settings);
        }}>
        <Text style={styles.btnText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  userDetailsContainer: {
    marginBottom: 20,
  },
  userDetailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
  },

  btnText: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 18,
    color: '#fff',
    width: '100%',
    paddingHorizontal: 40,
    textAlign: 'center',
  },
});

export default HomeScreen;
