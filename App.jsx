// import React, {useEffect, useState} from 'react';
// import RootComponent from './src/components/RootComponent';
// import {NavigationContainer, useNavigation} from '@react-navigation/native';
// import AppStack from './src/navigation/AppStack';
// import {getToken, hasToken} from './src/services/secureStorage';
// import AuthStack from './src/navigation/AuthStack';
// import LoadingScreen from './src/screens/LoadingScreen';

// const App = () => {
//   const [token, setToken] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function checkToken() {
//       const retrievedToken = await getToken();
//       setToken(retrievedToken);
//       console.log('token:', retrievedToken);
//       setLoading(false); // Ensure loading is false after retrieving token
//     }
//     checkToken();
//   }, []);

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <NavigationContainer>
//       <RootComponent>{token ? <AppStack /> : <AuthStack />}</RootComponent>
//     </NavigationContainer>
//   );
// };

// export default App;
// App.js

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
    getToken(); // Load token on app start
  }, [getToken]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootComponent>{token ? <AppStack /> : <AuthStack />}</RootComponent>
    </NavigationContainer>
  );
};

export default App;
