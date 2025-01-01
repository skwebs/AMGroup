import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';

const ANIMATION_TIME = 600;
const HIDE_DELAY = 1000;
const HIDE_POSITION = -25; // slide up 25px
const SHOW_POSITION = 0;
const CONNECTED_BGCOLOR = 'green';
const DISCONNECTED_BGCOLOR = 'red';

const RootComponent = ({children, rootStyles = {}}) => {
  const [networkStatus, setNetworkStatus] = useState({
    isConnected: true,
    message: '',
    bgColor: DISCONNECTED_BGCOLOR,
  });

  const animatedMessagePosition = useSharedValue(HIDE_POSITION);

  const animatedMessageStyle = useAnimatedStyle(() => ({
    transform: [{translateY: animatedMessagePosition.value}],
  }));

  const contentMarginStyle = useAnimatedStyle(() => ({
    marginTop: animatedMessagePosition.value,
  }));

  useEffect(() => {
    const handleNetworkChange = debounce(state => {
      const connection = state.isConnected;
      if (!connection) {
        setNetworkStatus({
          isConnected: false,
          message: 'No Internet',
          bgColor: DISCONNECTED_BGCOLOR,
        });
        animatedMessagePosition.value = withTiming(SHOW_POSITION, {
          duration: ANIMATION_TIME,
        });
      } else if (!networkStatus.isConnected) {
        setNetworkStatus({
          isConnected: true,
          message: 'Now Connected',
          bgColor: CONNECTED_BGCOLOR,
        });
        animatedMessagePosition.value = withDelay(
          HIDE_DELAY,
          withTiming(HIDE_POSITION, {duration: ANIMATION_TIME}),
        );
      }
    }, 500); // Debounce for 500ms

    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);
    return () => unsubscribe();
  }, [animatedMessagePosition, networkStatus.isConnected]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          animatedMessageStyle,
          styles.messageContainer,
          {backgroundColor: networkStatus.bgColor},
        ]}>
        <Text style={styles.messageText}>{networkStatus.message}</Text>
      </Animated.View>
      <Animated.View style={[contentMarginStyle, styles.container, rootStyles]}>
        {children}
      </Animated.View>
    </SafeAreaView>
  );
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    padding: 2,
  },
  messageText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default RootComponent;
