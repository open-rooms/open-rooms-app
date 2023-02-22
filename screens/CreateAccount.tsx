import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Alert, Button } from "react-native";
import { styles } from "./styles";
import { generatePrivateKey, getPublicKey } from "nostr-tools";
import { useNavigation } from "@react-navigation/native";
import { useStorage } from "../utils/storage-context";

export function CreateAccount() {
  const [username, setUsername] = useState("@");
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [accountPrivateKey, setAccountPrivateKey] = useState("");
  const [accountPublicKey, setAccountPublicKey] = useState("");
  const { connectAccount } = useStorage();

  const navigation = useNavigation<any>();

  useEffect(() => {
    let privateKey = generatePrivateKey();
    let publicKey = getPublicKey(privateKey);
    setAccountPrivateKey(privateKey);
    setAccountPublicKey(publicKey);
    connectAccount(accountPublicKey, accountPrivateKey);
  }, []);

  const onSignUpPress = async () => {
    if (!username) {
      Alert.alert(`Please fill in ${!username ? "Username " : ""}`);
    } else {
      navigation.navigate("Keys");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Username </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setUsername}
        value={username}
        placeholder="@username"
      />
      <Text style={styles.text}> Display Name </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setDisplayName}
        value={displayName}
        placeholder="Display name"
      />
      <Text style={styles.text}> About </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setAbout}
        scrollEnabled={true}
        value={about}
        placeholder="Creator of White Room. Truly a legend :-)."
      />
      <Text style={styles.text}> Account ID </Text>
      <Text style={styles.text}> {accountPublicKey} </Text>
      <Button title="Sign Up" onPress={onSignUpPress}></Button>
    </View>
  );
}

export default CreateAccount;
