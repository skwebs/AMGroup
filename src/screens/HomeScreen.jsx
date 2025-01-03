// import React from 'react';
// import {View, Button, StyleSheet} from 'react-native';
// import useAuthStore from '../store/authStore';

// const HomeScreen = () => {
//   const {deleteToken} = useAuthStore();

//   const handleLogout = async () => {
//     await deleteToken(); // Clear token
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{width: '100%'}}>
//         <Button title="Logout" onPress={handleLogout} />
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
// });

// import React, {useEffect, useState} from 'react';
// import {View, Button, Text, StyleSheet} from 'react-native';
// import axios from 'axios';
// import useAuthStore from '../store/authStore';

// const HomeScreen = () => {
//   const {deleteToken, token} = useAuthStore(); // Assuming you have a token in your store
//   const [user, setUser] = useState(null); // Store user details
//   const [loading, setLoading] = useState(false); // Track loading state
//   const [error, setError] = useState(null); // Track errors

//   // Fetch user details when the component mounts
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (!token) return; // If no token, don't fetch user data

//       setLoading(true); // Start loading
//       try {
//         const response = await axios.get(
//           'https://anshumemorial.in/finbook/api/user',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         setUser(response.data); // Set user data
//       } catch (err) {
//         setError('Failed to fetch user details'); // Set error message
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchUserDetails();
//   }, [token]); // Re-run when token changes

//   // Logout handler
//   const handleLogout = async () => {
//     await deleteToken(); // Clear token
//   };

//   return (
//     <View style={styles.container}>
//       {loading && <Text>Loading...</Text>} {/* Show loading text */}
//       {error && <Text style={styles.errorText}>{error} </Text>}
//       {/* Show error if any */}
//       {/* Display user details if available */}
//       {user ? (
//         <View style={styles.userDetailsContainer}>
//           <Text style={styles.userDetailText}>Name: {user.name}</Text>
//           <Text style={styles.userDetailText}>Email: {user.email}</Text>
//         </View>
//       ) : (
//         <Text>No user data available</Text>
//       )}
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   userDetailsContainer: {
//     marginBottom: 20,
//   },
//   userDetailText: {
//     fontSize: 16,
//     marginVertical: 5,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;

import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import {API_URL} from '../utils/config';

const HomeScreen = () => {
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
        const response = await axios.get(`${API_URL}/user`, {
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
          `${API_URL}/logout`,
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
      {user ? (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userDetailText}>Name: {user.name}</Text>
          <Text style={styles.userDetailText}>Email: {user.email}</Text>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
      <View style={{width: '100%'}}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

export default HomeScreen;
