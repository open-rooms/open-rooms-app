import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { generatePublickKey } from "../nostr/generateKeys";
import { useStorage } from "../utils/useStorage";

export function Login() {
  const { connectAccount } = useStorage();
  const navigation = useNavigation<any>();
  const [accountPrivateKey, setAccountPrivateKey] = useState("");

  const loginTitle = "Login";
  const privateKeyText = `
      Enter your private key to log in.`;

  const onLoginPress = async () => {
    if (accountPrivateKey.length >= 5) {
      const privateKey = accountPrivateKey.slice(5);
      const publicKey = generatePublickKey(privateKey);
      connectAccount(publicKey, privateKey);
      navigation.navigate("Feed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {loginTitle} </Text>
      <Text style={styles.text}> {privateKeyText} </Text>
      <TextInput
        style={styles.textInput}
        value={accountPrivateKey}
        onChangeText={setAccountPrivateKey}
        placeholder="nsec1..."
      />
      <Button title={"Login"} onPress={onLoginPress}></Button>
    </View>
  );
}

export default Login;
