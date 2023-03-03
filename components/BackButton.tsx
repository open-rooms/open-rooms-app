import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { IBackButton } from "../utils/types";

export function BackButton({ color, style }: IBackButton) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={style}>
      <MaterialIcons name="arrow-back" size={22} color={color} />
    </TouchableOpacity>
  );
}
