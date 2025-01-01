import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RootComponent from './src/components/RootComponent';

const App = () => {
  return (
    <RootComponent styles={styles}>
      <View>
        <Text>App</Text>
      </View>
    </RootComponent>
  );
};

export default App;

const styles = StyleSheet.create({});
