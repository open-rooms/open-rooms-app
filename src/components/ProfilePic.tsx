import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg'; // Import Circle instead of Rect
import colorPalette from '../utils/colorPalette';

interface ProfilePicProps {
  style?: {
    width?: number;
    height?: number;
    marginLeft?: number;
    marginRight?: number;
  };
}

const ProfilePic = ({style}: ProfilePicProps) => {
  const symbolSize = style?.width || 50;

  return (
    <View
      style={[
        styles.container,
        {width: symbolSize, height: symbolSize, borderRadius: symbolSize / 2},
        style,
      ]}>
      <Svg viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="50" fill={colorPalette.TEXT_COLOR_LIGHT} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default ProfilePic;
