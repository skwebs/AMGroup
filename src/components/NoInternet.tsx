// src/components/NoInternet.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useNetworkStore } from '../store/zustand/networkStore';

const NoInternet = () => {
  const isConnected = useNetworkStore((state) => state.isConnected);

  // Shared value for the opacity animation
  const visibility = useSharedValue(0);

  // Update animation when network status changes
  React.useEffect(() => {
    // If the network is disconnected, show the banner with an animation
    visibility.value = withTiming(isConnected ? 0 : 1, {
      duration: 500,
    });
  }, [isConnected, visibility]);

  // Define animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: visibility.value,
      transform: [
        {
          translateY: withTiming(visibility.value === 1 ? 0 : -50, {
            duration: 300,
          }),
        },
      ],
    };
  });

  // Don't render the component if the network is connected
  if (isConnected) { return null; }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>No Internet Connection</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff0000',
    padding: 10,
    alignItems: 'center',
    zIndex: 9999, // Ensure it appears on top of other UI elements
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NoInternet;
