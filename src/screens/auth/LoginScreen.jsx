import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { TextInput, Text, Snackbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import useAuthStore from '../../store/authStore';
import { API_URL } from '../../utils/config';
import { ROUTES } from '../../constants/route';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import FormTextInput from '../../components/common/FormTextInput';
import AuthService from '../../services/auth';

// Validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

const LoginScreen = () => {
  const { setToken } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async data => {

    try {
      setLoading(true); // Start loading
      await AuthService.login(data.email, data.password);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
    // const payload = {
    //   ...data,
    //   device_name: `${Platform.OS} ${Platform.Version}`,
    // };

    // try {
    //   setLoading(true); // Start loading
    //   // const response = await axios.post(
    //   //   `${API_URL + API_ENDPOINTS.LOGIN}`,
    //   //   payload,
    //   // );
    //   AuthService.login(email, password);

    //   if (response.status === 200) {
    //     setSnackbarMessage('Login Successful'); // Success message
    //     setSnackbarVisible(true); // Show snackbar

    //     await setToken(response.data.token); // Save token securely

    //     // console.log(response.data);

    //     navigation.navigate(ROUTES.home); // Redirect to HOME screen
    //   }
    // } catch (error) {
    //   // console.error('error.response:', error.response);

    //   if (error.response && error.response.status === 422) {
    //     setSnackbarMessage(
    //       error.response?.data?.message || 'Something went wrong',
    //     ); // Error message

    //     setSnackbarVisible(true); // Show snackbar
    //   } else {
    //     // console.error('Error:', error);
    //   }
    // } finally {
    //   setLoading(false); // Stop loading
    // }
  };

  return (
    <View style={styles.container}>
      <MIcon style={styles.icon} name="security" size={90} color="#aaa" />
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
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
      <View style={styles.errorTextContainer}>
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      {/* <FormTextInput
        name="username"
        control={{setValue, trigger}}
        errors={errors}
        placeholder="Enter your username"
      />
       */}

      {/* Name Input */}
      {/* <FormTextInput
        name="name"
        control={control}
        placeholder="Enter your name"
        focusedBorderColor="#28a745"
        defaultBorderColor="#ccc"
        inputStyle={styles.customInput}
      /> */}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
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
      <View style={styles.errorTextContainer}>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.loadingText}>Processing</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* register  Link */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {/* Other content */}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ROUTES.register)}>
            <Text style={styles.linkText}>New user? Create account</Text>
          </TouchableWithoutFeedback>
          {/* End of content */}
        </View>
      </TouchableWithoutFeedback>

      {/* Snackbar */}
      <Snackbar
        style={styles.snackbar}
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
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
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

  errorText: {
    color: 'red',
    fontSize: 12,
    // marginBottom: 10,
  },
  icon: {
    textAlign: 'center',
    // margin: 40,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    padding: 20,
    color: '#6200ee',
  },
  snackbar: {
    width: '100%',
  },
  errorTextContainer: {
    minHeight: 10,
  },
});

export default LoginScreen;
