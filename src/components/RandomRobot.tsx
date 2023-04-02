import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import seedrandom from 'seedrandom';

interface RandomRobotProps {
  style?: {
    width?: number;
    height?: number;
    borderRadius?: number;
    marginRight?: number;
  };
  seed?: string;
}

const RandomRobot = ({style, seed}: RandomRobotProps) => {
  const rng = seedrandom(seed);

  const robotColor = `hsl(${rng() * 360}, 100%, 50%)`;
  const eyeColor = `hsl(${rng() * 360}, 100%, 90%)`;
  const mouthColor = `hsl(${rng() * 360}, 100%, 10%)`;
  const robotSize = style?.width || 100;

  return (
    <View
      style={[
        {width: robotSize, height: robotSize, borderRadius: robotSize / 10},
        style,
      ]}>
      <Svg viewBox="0 0 100 100">
        <Path d="M 20,0 h 60 v 60 h -60 z" fill={robotColor} />
        <Path
          d="M 30,20 h 10 v 10 h -10 z M 60,20 h 10 v 10 h -10 z"
          fill={eyeColor}
        />
        <Path d="M 40,40 h 20 v 10 h -20 z" fill={mouthColor} />
      </Svg>
    </View>
  );
};

export default RandomRobot;
