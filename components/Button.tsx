import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {IButtonProps} from '../utils/types';
import {styles} from './styles';

export const Button = (props: IButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...props.buttonStyle,
        backgroundColor: props.buttonColor || 'black',
      }}
      disabled={props.disabled || false}
      onPress={props.onPress}>
      {props.isLoading && props.isLoading === true ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          style={{
            ...styles.title,
            color: props.titleColor || 'black',
          }}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
