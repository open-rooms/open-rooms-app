import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { generateKeys } from "../nostr/generateKeys";
import { useStorage } from "../utils/useStorage";
import { copyToClipboard } from "../utils/copyToClipboard";

export function Register() {
  const { connectAccount } = useStorage();
  const navigation = useNavigation<any>();
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [publicKeyCopied, setPublicKeyCopied] = React.useState(false);

  const accountPublicKey = `npub1${publicKey}`;
  const accountPrivateKey = `nsec1${privateKey}`;

  const publicKeyTitle = "Public Key";
  const publicKeyText = `
    This is your account ID. Save it, otherwise you will not be able to log in the future if you uninstall the app.`;

  const [privateKeyCopied, setPrivateKeyCopied] = React.useState(false);
  const privateKeyTitle = "Private Key";
  const privateKeyText = `
    This is your secret account key. You need this to access your account. Don't share this with anyone! Save it in a password manager and keep it safe!`;

  const copyPublicKeytoClipboard = async () => {
    copyToClipboard(accountPublicKey).then((status) =>
      setPublicKeyCopied(status)
    );
  };

  const copyPrivateKeytoClipboard = async () => {
    copyToClipboard(accountPrivateKey).then((status) =>
      setPrivateKeyCopied(status)
    );
  };

  useEffect(() => {
    const { publicKey, privateKey } = generateKeys();
    setPrivateKey(privateKey);
    setPublicKey(publicKey);
    connectAccount(publicKey, privateKey);
  }, []);

  const onContinuePress = async () => {
    if (privateKeyCopied && publicKeyCopied) {
      navigation.navigate("PublishEvent");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {publicKeyTitle} </Text>
      <Text style={styles.text}> {publicKeyText} </Text>
      <Text style={styles.text}> {accountPublicKey} </Text>
      <Button
        title={publicKeyCopied ? "Done!" : "Copy Public Key"}
        onPress={copyPublicKeytoClipboard}
      ></Button>

      {publicKeyCopied && (
        <>
          <Text style={styles.text}> {privateKeyTitle} </Text>
          <Text style={styles.text}> {privateKeyText} </Text>
          <Text style={styles.text}> {accountPrivateKey} </Text>
          <Button
            title={privateKeyCopied ? "Done!" : "Copy Private Key"}
            onPress={copyPrivateKeytoClipboard}
          ></Button>
        </>
      )}

      {privateKeyCopied && publicKeyCopied && (
        <Button title="Continue" onPress={onContinuePress}></Button>
      )}
    </View>
  );
}

export default Register;
