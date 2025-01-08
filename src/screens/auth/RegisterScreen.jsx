import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Text, Snackbar} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import useAuthStore from '../../store/authStore';
import {API_URL} from '../../utils/config';
import {ROUTES} from '../../constants/route';
import {API_ENDPOINTS} from '../../constants/apiEndpoints';

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
      const response = await axios.post(
        `${API_URL}${API_ENDPOINTS.REGISTER}`,
        payload,
      );

      console.log(response.data);

      if (response.status === 201) {
        setSnackbarMessage('Registration Successful');
        setSnackbarVisible(true);
        await setToken(response.data.token);
        console.log(response.data);
        navigation.navigate(ROUTES.home); // Redirect to HOME screen
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
      <View style={styles.errorTextContainer}>
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}
      </View>
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
      <View style={styles.errorTextContainer}>
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>
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
      <View style={styles.errorTextContainer}>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>
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
      <View style={styles.errorTextContainer}>
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
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
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {/* Other content */}
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableWithoutFeedback>

          {/* End of content */}
        </View>
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
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    minHeight: 20,
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

  errorTextContainer: {
    minHeight: 10,
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

export default RegisterScreen;
