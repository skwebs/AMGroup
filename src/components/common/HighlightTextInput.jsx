import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

const HighlightTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  style,
  focusedBorderColor = '#007bff',
  defaultBorderColor = '#ccc',
  error = '',
  errorStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          style,
          {
            borderColor: isFocused ? focusedBorderColor : defaultBorderColor,
          },
        ]}
        {...props}
      />
      {error ? (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      ) : null}
    </View>
  );
};

HighlightTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.oneOf([
    'default',
    'email-address',
    'numeric',
    'phone-pad',
  ]),
  secureTextEntry: PropTypes.bool,
  style: PropTypes.object,
  focusedBorderColor: PropTypes.string,
  defaultBorderColor: PropTypes.string,
  error: PropTypes.string,
  errorStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
});

export default HighlightTextInput;
