import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "../utils/types";

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonColor = "white",
  titleColor = "black",
  buttonStyle,
  textStyle,
  disabled,
  isLoading,
  ...rest
}) => (
  <TouchableOpacity
    style={{
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      borderColor: "black",
      backgroundColor: buttonColor,
      ...buttonStyle,
    }}
    disabled={disabled || false}
    onPress={onPress}
    {...rest}
  >
    {isLoading ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text
        style={{
          color: titleColor,
          fontSize: 14,
          ...textStyle,
        }}
      >
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

export default Button;
