import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Text, Snackbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import MIcon from 'react-native-vector-icons/MaterialIcons';
import AuthService from '../../services/auth';
import { ROUTES } from '../../constants/route';

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
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
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
      await AuthService.register(data);
      navigation.navigate('Home');
    } catch (error) {
      if (error.status === 422) {
        // Handle validation errors
        setServerErrors(error.errors || {});
        setSnackbarMessage(error.message || 'Validation failed');
      } else {
        // Handle other errors
        setSnackbarMessage(error.message || 'An error occurred during registration');
      }
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <MIcon style={styles.icon} name="person-add" size={90} color="#aaa" /> */}
      <Text style={styles.title}>Register</Text>

      {/* Name Input */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput

              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              mode="outlined"
              placeholder="Full Name"
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
            {serverErrors.name && (
              <Text style={styles.errorText}>{serverErrors.name[0]}</Text>
            )}
          </View>
        )}
      />

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
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
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
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry={!showPassword}
              mode="outlined"
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

      {/* Confirm Password Input */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
            )}
            {serverErrors.password_confirmation && (
              <Text style={styles.errorText}>{serverErrors.password_confirmation[0]}</Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.loadingText}>Processing</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TouchableWithoutFeedback onPress={() => navigation.popTo(ROUTES.login)}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

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
  inputContainer: {
    marginBottom: 15,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    padding: 20,
    color: '#6200ee',
  },
  loader: {
    marginVertical: 10,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
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
  snackbar: {
    backgroundColor: '#6200ee',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
});

export default RegisterScreen;
