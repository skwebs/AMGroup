import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useAuthStore from './src/store/authStore';
import RootComponent from './src/components/RootComponent';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import LoadingScreen from './src/screens/LoadingScreen';

const App = () => {
  const {token, loading, getToken} = useAuthStore();

  useEffect(() => {
    // Ensure token is fetched as soon as the app loads
    if (!token) {
      getToken();
    }
  }, [token, getToken]);

  // Show the loading screen while fetching the token
  if (loading) {
    return <LoadingScreen />;
  }

  // Memoize AppStack and AuthStack to prevent unnecessary re-renders
  const AppStackMemo = React.memo(AppStack);
  const AuthStackMemo = React.memo(AuthStack);

  return (
    <NavigationContainer>
      <RootComponent>
        {token ? <AppStackMemo /> : <AuthStackMemo />}
      </RootComponent>
    </NavigationContainer>
  );
};

export default App;
