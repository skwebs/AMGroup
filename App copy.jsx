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

// import React, {useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import useAuthStore from './src/store/authStore';
// import RootComponent from './src/components/RootComponent';
// import AppStack from './src/navigation/AppStack';
// import AuthStack from './src/navigation/AuthStack';
// import LoadingScreen from './src/screens/LoadingScreen';

// const App = () => {
//   const {token, loading, getToken} = useAuthStore();

//   useEffect(() => {
//     getToken(); // Load token on app start
//   }, [getToken]);

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

// // App.jsx
// import React, {useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import useAuthStore from './src/store/authStore';
// import RootComponent from './src/components/RootComponent';
// import AppStack from './src/navigation/AppStack';
// import AuthStack from './src/navigation/AuthStack';
// import LoadingScreen from './src/screens/LoadingScreen';

// const App = () => {
//   const {token, loading, getToken} = useAuthStore();

//   useEffect(() => {
//     // Ensure token is fetched as soon as the app loads
//     if (!token) {
//       getToken();
//     }
//   }, [token, getToken]);

//   // Show the loading screen while fetching the token
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
      {/* <RootComponent>
      </RootComponent> */}
      {/* {token ? <AppStackMemo /> : <AuthStackMemo />} */}
      <AuthStackMemo />
    </NavigationContainer>
  );
};

export default App;
