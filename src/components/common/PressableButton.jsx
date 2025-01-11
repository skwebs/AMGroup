import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {MaterialIcons} from 'react-native-vector-icons';

const PressableButton = ({
  title,
  onPress,
  loading = false,
  loadingText = 'Processing...',
  disabled = false,
  iconName,
  iconSize = 20,
  iconColor = '#fff',
  buttonStyle,
  textStyle,
  iconPosition = 'left', // 'left' or 'right'
  loaderColor = '#fff',
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({pressed}) => [
        styles.button,
        buttonStyle,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={loaderColor}
            style={styles.loader}
          />
        )}
        {!loading && iconName && iconPosition === 'left' && (
          <MaterialIcons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, textStyle]}>
          {loading ? loadingText : title}
        </Text>
        {!loading && iconName && iconPosition === 'right' && (
          <MaterialIcons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
      </View>
    </Pressable>
  );
};

PressableButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  loaderColor: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pressed: {
    backgroundColor: '#0056b3',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  loader: {
    marginRight: 8,
  },
});

export default PressableButton;
