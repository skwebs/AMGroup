import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const FormTextInput = ({
  label,
  name,
  control,
  errors,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  inputStyle,
  containerStyle,
  labelStyle,
  errorStyle,
}) => {
  const error = errors[name]?.message;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        style={[
          styles.input,
          inputStyle,
          error && {borderColor: 'red', borderWidth: 1},
        ]}
        onChangeText={value => control.setValue(name, value)}
        onBlur={() => control.trigger(name)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    height: 48,
    fontSize: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  error: {
    fontSize: 12,
    marginTop: 4,
    color: 'red',
  },
});

export default FormTextInput;
