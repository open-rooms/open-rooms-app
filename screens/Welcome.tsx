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
        onPress={() => navigation.navigate('Eula')}
      ></Button>
      <Button title="Sign In" onPress={() => console.log("Sign In")}></Button>
    </View>
  );
}

export default Welcome;
