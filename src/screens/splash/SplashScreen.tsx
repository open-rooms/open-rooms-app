import React, {useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

export function WithSplashScreen({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Splash isAppReady={isAppReady} />
      {isAppReady && children}
    </>
  );
}

const Splash = ({isAppReady}: {isAppReady: boolean}) => {
  const containerOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!isAppReady) {
      Animated.timing(containerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (isAppReady) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  });

  return (
    <Animated.View style={[style.container, {opacity: containerOpacity}]}>
      <Animated.Image
        source={require('../../assets/mask1.png')}
        style={style.mask}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'gray',
  },
  mask: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  logo: {
    width: '100%',
    height: 55,
  },
});
