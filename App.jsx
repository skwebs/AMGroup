import React, {useEffect} from 'react';
import useAuthStore from './src/store/zustand/authStore';
import AuthService from './src/services/auth';
import {NavigationContainer} from '@react-navigation/native';
import RootComponent from './src/components/RootComponent';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const {isAuthenticated, setAuthenticated} = useAuthStore(); // Get Zustand state and updater

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await AuthService.isAuthenticated();
        setAuthenticated(authStatus);
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setAuthenticated(false); // Handle error state
      }
    };

    checkAuth();
  }, [setAuthenticated]);

  // Show loading screen while `isAuthenticated` is null
  if (isAuthenticated === null) {
    return <SplashScreen />;
  }

  // Memoize AppStack and AuthStack
  const AppStackMemo = React.memo(AppStack);
  const AuthStackMemo = React.memo(AuthStack);

  return (
    <NavigationContainer>
      <RootComponent>
        {isAuthenticated ? <AppStackMemo /> : <AuthStackMemo />}
      </RootComponent>
    </NavigationContainer>
  );
};

export default App;
