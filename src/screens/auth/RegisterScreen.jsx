// // import {Button, StyleSheet, Text, View} from 'react-native';
// // import React from 'react';

// // const RegisterScreen = ({navigation}) => {
// //   return (
// //     <View>
// //       <Text>RegisterScreen</Text>
// //       <Button title="Login2" onPress={() => navigation.goBack()} />
// //     </View>
// //   );
// // };

// // export default RegisterScreen;

// // const styles = StyleSheet.create({});

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native'; // For navigation
// import Animated from 'react-native-reanimated';

// // Register Screen Component
// const RegisterScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigation = useNavigation();

//   const handleRegister = () => {
//     if (password === confirmPassword) {
//       // Proceed with registration logic here (e.g., API call)
//       console.log('Registering user with email:', email);
//     } else {
//       alert("Passwords don't match!");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Create Account</Text>
//         </View>

//         {/* Form */}
//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor="#aaa"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor="#aaa"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             placeholderTextColor="#aaa"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//         </View>

//         {/* Register Button */}
//         <TouchableOpacity
//           onPress={handleRegister}
//           style={styles.registerButton}>
//           <Text style={styles.registerButtonText}>Register</Text>
//         </TouchableOpacity>

//         {/* Login Link */}
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.loginText}>Already have an account? Login</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </ScrollView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//   },
//   keyboardView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   header: {
//     marginBottom: 30,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//   },
//   formContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     fontSize: 16,
//     color: '#333',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   registerButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 14,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   registerButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   loginText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#4CAF50',
//     fontSize: 16,
//   },
// });

// export default RegisterScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import {TextInput, Button} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native'; // For navigation

// const RegisterScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [text, setText] = useState();
//   const navigation = useNavigation();

//   const handleRegister = () => {
//     if (password === confirmPassword) {
//       console.log('Registering user with email:', email);
//       // Proceed with registration logic
//     } else {
//       Alert.alert("Passwords don't match!");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}>
//         {/* Tap anywhere to dismiss keyboard */}
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.innerContainer}>
//             {/* Header */}
//             <View style={styles.header}>
//               <Text style={styles.headerText}>Create Account</Text>
//             </View>

//             {/* Form */}
//             <View style={styles.formContainer}>
//               <TextInput
//                 label="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 mode="outlined"
//               />
//               <TextInput
//                 label="Password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 mode="outlined"
//               />
//               <TextInput
//                 label="Confirm Password"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry
//                 mode="outlined"
//               />
//             </View>

//             {/* Register Button */}
//             <Button
//               mode="contained"
//               onPress={handleRegister}
//               style={styles.registerButton}>
//               Register
//             </Button>

//             {/* Login Link */}
//             <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
//               <Text style={styles.loginText}>
//                 Already have an account? Login
//               </Text>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   keyboardView: {
//     flex: 1,
//     justifyContent: 'center',
//     width: '100%',
//   },
//   innerContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//   },
//   header: {
//     marginBottom: 40,
//   },
//   headerText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//   },
//   formContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 20,
//   },
//   inputFocused: {
//     borderColor: '#4CAF50',
//     elevation: 5, // Adding shadow effect when focused
//   },
//   registerButton: {
//     marginTop: 20,
//     borderRadius: 5,
//   },
//   loginText: {
//     textAlign: 'center',
//     marginTop: 40,
//     color: '#4CAF50',
//     fontSize: 18,
//   },
// });

// export default RegisterScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Platform,
//   ActivityIndicator,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {TextInput, Button, Text, Snackbar} from 'react-native-paper';
// import {useForm, Controller} from 'react-hook-form';
// import {z} from 'zod';
// import {zodResolver} from '@hookform/resolvers/zod';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import MIcon from 'react-native-vector-icons/MaterialIcons';

// // Validation schema with Zod
// const registerSchema = z.object({
//   name: z.string().nonempty('Name is required'),
//   email: z.string().email('Invalid email').nonempty('Email is required'),
//   password: z
//     .string()
//     .min(6, 'Password must be at least 6 characters')
//     .nonempty('Password is required'),
// });

// const RegisterScreen = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility
//   const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
//   const navigation = useNavigation();

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async data => {
//     const payload = {
//       ...data,
//       device_name: `${Platform.OS} ${Platform.Version}`,
//     };

//     try {
//       setLoading(true); // Start loading
//       const response = await axios.post(
//         'https://anshumemorial.in/finbook/api/register',
//         payload,
//       );

//       if (response.status === 201) {
//         setSnackbarMessage('Registration Successful'); // Success message
//         setSnackbarVisible(true); // Show snackbar
//         console.log(response.data);
//         navigation.navigate('LOGIN'); // Redirect to LOGIN screen
//       }
//     } catch (error) {
//       setSnackbarMessage(
//         error.response?.data?.message || 'Something went wrong',
//       ); // Error message
//       setSnackbarVisible(true); // Show snackbar
//       console.error(error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MIcon style={styles.icon} name="person-add" size={90} color="#aaa" />
//       <Text style={styles.title}>Register</Text>

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
//         disabled={loading}>
//         {loading ? 'Processing...' : 'Register'}
//       </Button>

//       {loading && (
//         <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
//       )}

//       {/* Login Link */}
//       <TouchableWithoutFeedback onPress={() => navigation.navigate('LOGIN')}>
//         <Text style={styles.loginText}>Already have an account? Login</Text>
//       </TouchableWithoutFeedback>

//       {/* Snackbar */}
//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         action={{
//           label: 'Close',
//           onPress: () => setSnackbarVisible(false),
//         }}>
//         {snackbarMessage}
//       </Snackbar>
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
//     marginVertical: 20,
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
//   loginText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#4CAF50',
//     fontSize: 18,
//   },
// });

// export default RegisterScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Platform,
//   ActivityIndicator,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {TextInput, Button, Text, Snackbar} from 'react-native-paper';
// import {useForm, Controller} from 'react-hook-form';
// import {z} from 'zod';
// import {zodResolver} from '@hookform/resolvers/zod';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';
// import MIcon from 'react-native-vector-icons/MaterialIcons';

// // Validation schema with Zod
// const registerSchema = z
//   .object({
//     name: z.string().nonempty('Name is required'),
//     email: z.string().email('Invalid email').nonempty('Email is required'),
//     password: z
//       .string()
//       .min(6, 'Password must be at least 6 characters')
//       .nonempty('Password is required'),
//     confirmPassword: z.string().nonempty('Confirm Password is required'),
//   })
//   .refine(data => data.password === data.confirmPassword, {
//     path: ['confirmPassword'],
//     message: 'Passwords must match',
//   });

// const RegisterScreen = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility
//   const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
//   const navigation = useNavigation();

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async data => {
//     const payload = {
//       name: data.name,
//       email: data.email,
//       password: data.password,
//       device_name: `${Platform.OS} ${Platform.Version}`,
//     };

//     try {
//       setLoading(true); // Start loading
//       const response = await axios.post(
//         'https://anshumemorial.in/finbook/api/register',
//         payload,
//       );

//       if (response.status === 201) {
//         setSnackbarMessage('Registration Successful'); // Success message
//         setSnackbarVisible(true); // Show snackbar
//         console.log(response.data);
//         navigation.navigate('LOGIN'); // Redirect to LOGIN screen
//       }
//     } catch (error) {
//       setSnackbarMessage(
//         error.response?.data?.message || 'Something went wrong',
//       ); // Error message
//       setSnackbarVisible(true); // Show snackbar
//       console.error(error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MIcon style={styles.icon} name="person-add" size={90} color="#aaa" />
//       <Text style={styles.title}>Register</Text>

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

//       {/* Confirm Password Input */}
//       <Controller
//         control={control}
//         name="confirmPassword"
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             label="Confirm Password"
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
//             error={!!errors.confirmPassword}
//           />
//         )}
//       />
//       {errors.confirmPassword && (
//         <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
//       )}

//       {/* Submit Button */}
//       <Button
//         mode="contained"
//         onPress={handleSubmit(onSubmit)}
//         style={styles.button}
//         disabled={loading}>
//         {loading ? 'Processing...' : 'Register'}
//       </Button>

//       {loading && (
//         <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
//       )}

//       {/* Login Link */}
//       <TouchableWithoutFeedback onPress={() => navigation.navigate('LOGIN')}>
//         <Text style={styles.loginText}>Already have an account? Login</Text>
//       </TouchableWithoutFeedback>

//       {/* Snackbar */}
//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         action={{
//           label: 'Close',
//           onPress: () => setSnackbarVisible(false),
//         }}>
//         {snackbarMessage}
//       </Snackbar>
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
//     marginVertical: 20,
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
//   loginText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#4CAF50',
//     fontSize: 18,
//   },
// });

// export default RegisterScreen;

import React, {useState} from 'react';
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

const registerSchema = z
  .object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email').nonempty('Email is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .nonempty('Password is required'),
    confirmPassword: z.string().nonempty('Confirm Password is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

const RegisterScreen = () => {
  const {setToken} = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async data => {
    console.log(data);

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      device_name: `${Platform.OS} ${Platform.Version}`,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/register`, payload);

      console.log(response.data);

      if (response.status === 201) {
        setSnackbarMessage('Registration Successful');
        setSnackbarVisible(true);
        await setToken(response.data.token);
        console.log(response.data);
        navigation.navigate('HOME'); // Redirect to HOME screen
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          Object.keys(validationErrors).forEach(key => {
            if (key === 'name') {
              setSnackbarMessage(validationErrors[key][0]);
            } else if (key === 'email') {
              setSnackbarMessage(validationErrors[key][0]);
            } else if (key === 'password') {
              setSnackbarMessage(validationErrors[key][0]);
            } else {
              setSnackbarMessage('Validation error. Please check your input.');
            }
          });
        } else {
          setSnackbarMessage('Invalid input. Please try again.');
        }
      } else {
        setSnackbarMessage(
          error.response?.data?.message || 'Something went wrong',
        );
      }
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MIcon style={styles.icon} name="person-add" size={90} color="#aaa" />
      <Text style={styles.title}>Register</Text>

      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Name"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

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

      <Controller
        control={control}
        name="confirmPassword"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Confirm Password"
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
            error={!!errors.confirmPassword}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={loading}>
        {loading ? 'Processing...' : 'Register'}
      </Button>

      {loading && (
        <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
      )}

      <TouchableWithoutFeedback onPress={() => navigation.navigate('LOGIN')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableWithoutFeedback>

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
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#6200ee',
  },
  loader: {
    marginVertical: 10,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default RegisterScreen;
