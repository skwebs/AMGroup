// import React from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import {useForm, Controller} from 'react-hook-form';
// import * as yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';
// import api from 'axios'; // Import your Axios instance

// // Validation schema using yup
// const schema = yup.object({
//   email: yup
//     .string()
//     .email('Please enter a valid email address')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const LoginScreen = ({navigation}) => {
//   // React Hook Form setup
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async data => {
//     console.log(data);
//     try {
//       // Send a POST request to the Laravel API login endpoint
//       const response = await api.post(
//         'https://anshumemorial.in/finbook/api/login',
//         {
//           email: data.email,
//           password: data.password,
//           device_name: `${Platform.OS} ${Platform.Version}`,
//         },
//       );

//       // Handle successful login
//       console.log('Login successful', response.data);
//       // Store the token or user info if needed
//       // You can save the token using AsyncStorage or a global state management tool

//       // Navigate to the next screen (e.g., Dashboard)
//       // navigation.navigate('Dashboard');
//     } catch (error) {
//       // Handle error
//       console.error('Login failed', error.response?.data || error.message);
//     }
//   };

//   // const [email, setEmail] = useState('');
//   // const [password, setPassword] = useState('');
//   // const [errors, setErrors] = useState({});
//   // const [loading, setLoading] = useState(false); // Added loading state
//   // const {setUser} = useContext(AuthContext);

//   // const handleLogin = async () => {
//   //   setErrors({});
//   //   setLoading(true); // Start loading indicator
//   //   try {
//   //     await login({
//   //       email,
//   //       password,
//   //       device_name: `${Platform.OS} ${Platform.Version}`,
//   //     });
//   //     const user = await loadUser();
//   //     setUser(user);
//   //   } catch (er) {
//   //     if (er.response?.status === 422) {
//   //       setErrors(er.response.data.errors); // Display validation errors
//   //     } else {
//   //       Alert.alert('Login Failed', 'Invalid credentials or server error.'); // General error handling
//   //     }
//   //   } finally {
//   //     setLoading(false); // Stop loading indicator
//   //   }
//   // };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>Login</Text>

//       {/* Email input */}
//       <Controller
//         control={control}
//         name="email"
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             value={value}
//             onChangeText={onChange}
//           />
//         )}
//       />
//       {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

//       {/* Password input */}
//       <Controller
//         control={control}
//         name="password"
//         render={({field: {onChange, value}}) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your password"
//             secureTextEntry
//             value={value}
//             onChangeText={onChange}
//           />
//         )}
//       />
//       {errors.password && (
//         <Text style={styles.error}>{errors.password.message}</Text>
//       )}

//       {/* Submit button */}
//       <Button title="Login" onPress={handleSubmit(onSubmit)} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     padding: 16,
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 4,
//     marginBottom: 10,
//     paddingLeft: 8,
//   },
//   error: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 10,
//   },
// });

// export default LoginScreen;
// import React from 'react';
// import {View, StyleSheet, Alert, Platform} from 'react-native';
// import {TextInput, Button, Text} from 'react-native-paper';
// import {useForm, Controller} from 'react-hook-form';
// import {z} from 'zod';
// import {zodResolver} from '@hookform/resolvers/zod';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';

// // Validation schema with Zod
// const loginSchema = z.object({
//   name: z.string().nonempty('Name is required'),
//   email: z.string().email('Invalid email').nonempty('Email is required'),
//   device_name: z.string().nonempty('Device name is required'),
// });

// const LoginScreen = () => {
//   const navigation = useNavigation();

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async data => {
//     const payload = {
//       ...data,
//       device_name: `${Platform.OS} ${Platform.Version}`,
//     };
//     try {
//       const response = await axios.post(
//         'https://your-laravel-api-url.com/api/login',
//         payload,
//       );

//       // Assuming Laravel API returns a token on successful login
//       if (response.status === 200) {
//         Alert.alert('Success', 'Login Successful');
//         navigation.navigate('HOME'); // Redirect to HOME screen
//       }
//     } catch (error) {
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Something went wrong',
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       {/* Name Input */}
//       <Controller
//         control={control}
//         name="name"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Name"
//             mode="outlined"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.name}
//           />
//         )}
//       />
//       {errors.name && (
//         <Text style={styles.errorText}>{errors.name.message}</Text>
//       )}

//       {/* Email Input */}
//       <Controller
//         control={control}
//         name="email"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Email"
//             mode="outlined"
//             keyboardType="email-address"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.email}
//           />
//         )}
//       />
//       {errors.email && (
//         <Text style={styles.errorText}>{errors.email.message}</Text>
//       )}

//       {/* Device Name Input */}
//       <Controller
//         control={control}
//         name="device_name"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Device Name"
//             mode="outlined"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.device_name}
//           />
//         )}
//       />
//       {errors.device_name && (
//         <Text style={styles.errorText}>{errors.device_name.message}</Text>
//       )}

//       {/* Submit Button */}
//       <Button
//         mode="contained"
//         onPress={handleSubmit(onSubmit)}
//         style={styles.button}>
//         Login
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     // justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     padding: 20,
//   },
//   button: {
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 10,
//   },
// });

// export default LoginScreen;

// import React from 'react';
// import {View, StyleSheet, Alert, Platform} from 'react-native';
// import {TextInput, Button, Text} from 'react-native-paper';
// import {useForm, Controller} from 'react-hook-form';
// import {z} from 'zod';
// import {zodResolver} from '@hookform/resolvers/zod';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MIcon from 'react-native-vector-icons/MaterialIcons';
// // Validation schema with Zod
// const loginSchema = z.object({
//   email: z.string().email('Invalid email').nonempty('Email is required'),
//   password: z.string().nonempty('Password is required'),
// });

// const LoginScreen = () => {
//   const navigation = useNavigation();

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async data => {
//     // Append device_name to the request payload
//     const payload = {
//       ...data,
//       device_name: `${Platform.OS} ${Platform.Version}`,
//     };

//     try {
//       const response = await axios.post(
//         'https://anshumemorial.in/finbook/api/login',
//         payload,
//       );

//       if (response.status === 200) {
//         Alert.alert('Success', 'Login Successful');
//         navigation.navigate('HOME'); // Redirect to HOME screen
//       }
//     } catch (error) {
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Something went wrong',
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MIcon style={styles.icon} name="security" size={90} color="#aaa" />
//       <Text style={styles.title}>Login</Text>

//       {/* Email Input */}
//       <Controller
//         control={control}
//         name="email"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Email"
//             mode="outlined"
//             keyboardType="email-address"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.email}
//           />
//         )}
//       />
//       {errors.email && (
//         <Text style={styles.errorText}>{errors.email.message}</Text>
//       )}

//       {/* Password Input */}
//       <Controller
//         control={control}
//         name="password"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Password"
//             mode="outlined"
//             secureTextEntry
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.password}
//           />
//         )}
//       />
//       {errors.password && (
//         <Text style={styles.errorText}>{errors.password.message}</Text>
//       )}

//       {/* Submit Button */}
//       <Button
//         mode="contained"
//         onPress={handleSubmit(onSubmit)}
//         style={styles.button}>
//         Login
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     // justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     // textAlign: 'center',
//     // padding: 40,
//   },
//   button: {
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   icon: {
//     textAlign: 'center',
//     margin: 40,
//   },
// });

// export default LoginScreen;

// import React, {useState} from 'react';
// import {View, StyleSheet, Alert, Platform} from 'react-native';
// import {TextInput, Button, Text, IconButton} from 'react-native-paper';
// import {useForm, Controller} from 'react-hook-form';
// import {z} from 'zod';
// import {zodResolver} from '@hookform/resolvers/zod';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import MIcon from 'react-native-vector-icons/MaterialIcons';

// import {deleteToken, getToken} from '../../services/secureStorage';
// import useAuthStore from '../../store/authStore';

// // Validation schema with Zod
// const loginSchema = z.object({
//   email: z.string().email('Invalid email').nonempty('Email is required'),
//   password: z.string().nonempty('Password is required'),
// });

// const LoginScreen = () => {
//   const {setToken} = useAuthStore();
//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
//   const navigation = useNavigation();

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async data => {
//     // Append device_name to the request payload
//     const payload = {
//       ...data,
//       device_name: `${Platform.OS} ${Platform.Version}`,
//     };

//     try {
//       const response = await axios.post(
//         'https://anshumemorial.in/finbook/api/login',
//         payload,
//       );

//       if (response.status === 200) {
//         Alert.alert('Success', 'Login Successful');
//         await setToken(response.data.token); // Save token securely
//         console.log(response.data);
//         navigation.navigate('HOME'); // Redirect to HOME screen
//       }
//     } catch (error) {
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Something went wrong',
//       );
//       console.error(error);
//     }
//   };

//   const retrieveSecureData = async () => {
//     try {
//       const token = await getToken();
//       if (token) {
//         console.log('Credentials successfully loaded:', token);
//       } else {
//         console.log('No credentials stored');
//       }
//     } catch (error) {
//       console.log('Could not load credentials:', error);
//     }
//   };

//   const deleteSecureData = async () => {
//     try {
//       await deleteToken();
//       console.log('Credentials successfully deleted!');
//     } catch (error) {
//       console.log('Could not delete credentials:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MIcon style={styles.icon} name="security" size={90} color="#aaa" />
//       <Text style={styles.title}>Login</Text>

//       {/* Email Input */}
//       <Controller
//         control={control}
//         name="email"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Email"
//             mode="outlined"
//             keyboardType="email-address"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.email}
//           />
//         )}
//       />
//       {errors.email && (
//         <Text style={styles.errorText}>{errors.email.message}</Text>
//       )}

//       {/* Password Input */}
//       <Controller
//         control={control}
//         name="password"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Password"
//             mode="outlined"
//             secureTextEntry={!showPassword} // Toggle password visibility
//             right={
//               <TextInput.Icon
//                 icon={showPassword ? 'eye-off' : 'eye'} // Eye icon for toggle
//                 onPress={() => setShowPassword(prev => !prev)} // Toggle state
//               />
//             }
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.password}
//           />
//         )}
//       />
//       {errors.password && (
//         <Text style={styles.errorText}>{errors.password.message}</Text>
//       )}

//       {/* Submit Button */}
//       <Button
//         mode="contained"
//         onPress={handleSubmit(onSubmit)}
//         style={styles.button}>
//         Login
//       </Button>

//       <Button
//         mode="contained"
//         onPress={retrieveSecureData}
//         style={styles.button}>
//         Retrieve Secure Data
//       </Button>
//       <Button mode="contained" onPress={deleteSecureData} style={styles.button}>
//         Delete Secure Data
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     // justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     // textAlign: 'center',
//   },
//   button: {
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   icon: {
//     textAlign: 'center',
//     margin: 40,
//   },
// });

// export default LoginScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Alert,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import {TextInput, Button, Text} from 'react-native-paper';
// import {useForm, Controller} from 'react-hook-form';
// import {z} from 'zod';
// import {zodResolver} from '@hookform/resolvers/zod';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import MIcon from 'react-native-vector-icons/MaterialIcons';

// import {deleteToken, getToken} from '../../services/secureStorage';
// import useAuthStore from '../../store/authStore';

// // Validation schema with Zod
// const loginSchema = z.object({
//   email: z.string().email('Invalid email').nonempty('Email is required'),
//   password: z.string().nonempty('Password is required'),
// });

// const LoginScreen = () => {
//   const {setToken} = useAuthStore();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigation = useNavigation();

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async data => {
//     // Append device_name to the request payload
//     const payload = {
//       ...data,
//       device_name: `${Platform.OS} ${Platform.Version}`,
//     };

//     try {
//       setLoading(true); // Start loading
//       const response = await axios.post(
//         'https://anshumemorial.in/finbook/api/login',
//         payload,
//       );

//       if (response.status === 200) {
//         Alert.alert('Success', 'Login Successful');
//         await setToken(response.data.token); // Save token securely
//         console.log(response.data);
//         navigation.navigate('HOME'); // Redirect to HOME screen
//       }
//     } catch (error) {
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || 'Something went wrong',
//       );
//       console.error(error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MIcon style={styles.icon} name="security" size={90} color="#aaa" />
//       <Text style={styles.title}>Login</Text>

//       {/* Email Input */}
//       <Controller
//         control={control}
//         name="email"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Email"
//             mode="outlined"
//             keyboardType="email-address"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.email}
//           />
//         )}
//       />
//       {errors.email && (
//         <Text style={styles.errorText}>{errors.email.message}</Text>
//       )}

//       {/* Password Input */}
//       <Controller
//         control={control}
//         name="password"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Password"
//             mode="outlined"
//             secureTextEntry={!showPassword}
//             right={
//               <TextInput.Icon
//                 icon={showPassword ? 'eye-off' : 'eye'}
//                 onPress={() => setShowPassword(prev => !prev)}
//               />
//             }
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             error={!!errors.password}
//           />
//         )}
//       />
//       {errors.password && (
//         <Text style={styles.errorText}>{errors.password.message}</Text>
//       )}

//       {/* Submit Button */}
//       <Button
//         mode="contained"
//         onPress={handleSubmit(onSubmit)}
//         style={styles.button}
//         disabled={loading} // Disable button while loading
//       >
//         {loading ? 'Processing...' : 'Login'}
//       </Button>

//       {/* Show loading spinner */}
//       {loading && (
//         <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     marginTop: 20,
//   },
//   loader: {
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   icon: {
//     textAlign: 'center',
//     margin: 40,
//   },
// });

// export default LoginScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput, Button, Text, Snackbar} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import useAuthStore from '../../store/authStore';
import {API_URL} from '../../utils/config';

// Validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

const LoginScreen = () => {
  const {setToken} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const navigation = useNavigation();

  const init = async () => {
    const url = API_URL + '/login';
    console.log(url); // 'https://anshumemorial.in/finbook/api/login'
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async data => {
    const payload = {
      ...data,
      device_name: `${Platform.OS} ${Platform.Version}`,
    };

    try {
      setLoading(true); // Start loading
      const response = await axios.post(`${API_URL}/login`, payload);

      if (response.status === 200) {
        setSnackbarMessage('Login Successful'); // Success message
        setSnackbarVisible(true); // Show snackbar
        await setToken(response.data.token); // Save token securely
        console.log(response.data);
        navigation.navigate('HOME'); // Redirect to HOME screen
      }
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || 'Something went wrong',
      ); // Error message
      setSnackbarVisible(true); // Show snackbar
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <MIcon style={styles.icon} name="security" size={90} color="#aaa" />
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(prev => !prev)}
              />
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={loading}>
        {loading ? 'Processing...' : 'Login'}
      </Button>

      {loading && (
        <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
      )}

      {/* register  Link */}
      <TouchableWithoutFeedback onPress={() => navigation.navigate('REGISTER')}>
        <Text style={styles.registerText}>New user? Create account</Text>
      </TouchableWithoutFeedback>

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Close',
          onPress: () => setSnackbarVisible(false),
        }}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 20,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  icon: {
    textAlign: 'center',
    margin: 40,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#4CAF50',
    fontSize: 18,
  },
});

export default LoginScreen;
