import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ROUTES } from '../constants/route';
import AuthService from '../services/auth';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null); // Store user details
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true); // Start loading

      try {
        const userData = await AuthService.getUserDetails();

        setUser(userData); // Set user data
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user details'); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserDetails();
  }, []); // Re-run when token changes

  // Logout handler
  const handleLogout = async () => {
    try {
      setLoading(true); // Start loading
      await AuthService.logout();
      console.log('Logged out successfully');
    } catch (err) {
      console.error('Error during logout', err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Show error if any */}
      {/* Display user details if available */}
      {user ? (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userDetailText}>Name: {user.name}</Text>
          <Text style={styles.userDetailText}>Email: {user.email}</Text>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(ROUTES.settings);
        }}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.loadingText}>Processing</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Logout</Text>
        )}
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
  button: {
    backgroundColor: '#007BFF',
    // backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
