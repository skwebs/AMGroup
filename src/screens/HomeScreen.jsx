import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AuthService from '../services/auth';
import useAuthStore from '../store/zustand/authStore';
import { ROUTES } from '../constants/route';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const { setAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userData = await AuthService.getUserDetails();
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError('Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await AuthService.logout();
      setAuthenticated(false);
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading user details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchUserDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userDetailsContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        {user && (
          <>
            <Text style={styles.userDetailText}>Name: {user.name}</Text>
            <Text style={styles.userDetailText}>Email: {user.email}</Text>
            <Text style={styles.userDetailText}>Mobile: {user.mobile}</Text>
          </>
        )}
      </View>



      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.logoutButtonText}>Processing...</Text>
          </View>
        ) : (
          <Text style={styles.logoutButtonText}>Logout</Text>
        )}
      </TouchableOpacity>


      <TouchableOpacity
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
    padding: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  userDetailsContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  userDetailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  btnText: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginVertical: 30,
    fontSize: 16,
    color: '#fff',
    width: '100%',

    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
