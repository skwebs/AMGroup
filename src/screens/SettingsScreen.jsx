import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          // Navigate to HomeScreen
          navigation.goBack();
        }}>
        <Text style={styles.btnText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnText: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 18,
    color: '#fff',
    width: '100%',
    paddingHorizontal: 40,
    textAlign: 'center',
  },
});
