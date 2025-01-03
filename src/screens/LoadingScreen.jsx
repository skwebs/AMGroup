import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <ActivityIndicator color="white" size={40} />
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          marginLeft: 10,
          fontSize: 24,
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
