import React, { useState } from 'react';
import {
  View,
  StyleSheet,
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import MIcon from 'react-native-vector-icons/MaterialIcons';

import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../constants/route';
import AuthService from '../../services/auth';

// Validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

const LoginScreen = () => {
  useAuthStore();
  const [loading, setLoading] = useState(false); // Loading state
  const [serverErrors, setServerErrors] = useState({}); // Server errors
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Cleanup when screen loses focus
        setServerErrors({});
        setSnackbarMessage('');
        reset();
      };
    }, [reset])
  );

  const onSubmit = async data => {
    setServerErrors({});
    setSnackbarMessage('');

    try {
      setLoading(true);
      await AuthService.login(data);
      navigation.navigate(ROUTES.home);
    } catch (error) {
      if (error.status === 422) {
        // Handle validation errors
        setServerErrors(error.errors || {});
        setSnackbarMessage(error.message || 'Validation failed');
      } else {
        // Handle other errors
        setSnackbarMessage(error.message || 'An error occurred during login');
      }
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility

  return (
    <View style={styles.container}>
      {/* <MIcon style={styles.icon} name="security" size={90} color="#aaa" /> */}
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput

              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            {serverErrors.email && (
              <Text style={styles.errorText}>{serverErrors.email[0]}</Text>
            )}
          </View>
        )}
      />

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput

              onBlur={onBlur}
              mode="outlined"
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            {serverErrors.password && (
              <Text style={styles.errorText}>{serverErrors.password[0]}</Text>
            )}
          </View>
        )}
      />

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
            onPress={() => navigation.navigate(ROUTES.register)}
          >
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
        }}
      >
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
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    fontWeight: 'bold',
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
    marginTop: 5,
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
  inputContainer: {
    marginBottom: 15,
  },
});

export default LoginScreen;
