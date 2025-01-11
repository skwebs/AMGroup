import React, {useState} from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const FormTextInput = ({
  name,
  control,
  rules = {},
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  focusedBorderColor = '#007bff',
  defaultBorderColor = '#ccc',
  errorStyle,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              placeholder={placeholder}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              style={[
                styles.input,
                inputStyle,
                {
                  borderColor: isFocused
                    ? focusedBorderColor
                    : error
                    ? 'red'
                    : defaultBorderColor,
                },
                {borderWidth: isFocused ? 2 : 1},
              ]}
              {...props}
            />
            {error && (
              <Text style={[styles.errorText, errorStyle]}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 2,
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

export default FormTextInput;
