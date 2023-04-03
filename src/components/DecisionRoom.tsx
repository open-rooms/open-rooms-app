import React from 'react';
import {View} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import {PRIMARY_COLOR} from '../utils/colors';

interface DecisionRoomProps {
  style?: {
    width?: number;
    height?: number;
    marginRight?: number;
  };
}

const DecisionRoom = ({style}: DecisionRoomProps) => {
  const symbolSize = style?.width || 50;

  return (
    <View style={[{width: symbolSize, height: symbolSize}, style]}>
      <Svg viewBox="0 0 100 100">
        <Rect x="0" y="0" width="100" height="100" fill={PRIMARY_COLOR} />
      </Svg>
    </View>
  );
};

export default DecisionRoom;
