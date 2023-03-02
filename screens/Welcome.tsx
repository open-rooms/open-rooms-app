import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export function Welcome() {
  const navigation = useNavigation<any>();
  const welcomeTitle = "White Room";
  const welcomeText = "Welcome to decentalized voting app you control";

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {welcomeTitle} </Text>
      <Text style={styles.text}> {welcomeText} </Text>
      <Button
        title="Create Account"
        onPress={() => navigation.navigate("Eula", { screen: "Register" })}
      ></Button>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Eula", { screen: "Login" })}
      ></Button>
    </View>
  );
}

export default Welcome;
