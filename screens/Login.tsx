import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { generatePublickKey } from "../nostr/generateKeys";
import { useStorage } from "../utils/useStorage";
import { BackButton } from "../components/BackButton";
import { PRIMARY_COLOR } from "../utils/colors";
import { Button } from "../components/Button";

export function Login() {
  const { connectAccount } = useStorage();
  const navigation = useNavigation<any>();
  const [accountPrivateKey, setAccountPrivateKey] = useState("");

  const loginTitle = "Login";
  const privateKeyText = `
      Enter your private key to login.`;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton color={PRIMARY_COLOR} style={styles.backButton} />
      ),
      headerTitle: "",
    });
  }, [navigation]);

  const onLoginPress = async () => {
    if (accountPrivateKey) {
      const privateKey = accountPrivateKey.slice(5);
      const publicKey = generatePublickKey(privateKey);
      connectAccount(publicKey, privateKey);
      navigation.navigate("Feed");
    } else {
      alert("Invalid private key");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {loginTitle} </Text>
      <Text style={styles.text}> {privateKeyText} </Text>
      <TextInput
        style={styles.textInput}
        value={accountPrivateKey}
        onChangeText={setAccountPrivateKey}
        placeholder="nsec1..."
      />

      <Button
        title={"Login"}
        onPress={onLoginPress}
        buttonColor={PRIMARY_COLOR}
        titleColor={"white"}
        buttonStyle={styles.button}
      ></Button>
    </View>
  );
}

export default Login;
