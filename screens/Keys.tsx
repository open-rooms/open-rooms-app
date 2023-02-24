import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, Alert, Button } from "react-native";
import { styles } from "./styles";
import { generatePrivateKey, getPublicKey } from "nostr-tools";
import { useNavigation } from "@react-navigation/native";
import { useStorage } from "../utils/storage-context";
import * as Clipboard from "expo-clipboard";
import base58 from "bs58";
import { Buffer } from "buffer";

export function Keys() {
  const [accountPrivateKey, setAccountPrivateKey] = useState("");
  const [accountPublicKey, setAccountPublicKey] = useState("");
  const { connectAccount } = useStorage();

  const [publicKeyCopied, setPublicKeyCopied] = React.useState(false);
  const publicKeyTitle = "Public Key";
  const publicKeyText = `
This is your account ID. Save it, otherwise you will not be able to log in the future if you uninstall the app.`;

  const [privateKeyCopied, setPrivateKeyCopied] = React.useState(false);
  const privateKeyTitle = "Private Key";
  const privateKeyText = `
This is your secret account key. You need this to access your account. Don't share this with anyone! Save it in a password manager and keep it safe!`;

  const copyPublicKeytoClipboard = async () => {
    await Clipboard.setStringAsync(accountPublicKey);
    setPublicKeyCopied(true);
  };
  const copyPrivateKeytoClipboard = async () => {
    await Clipboard.setStringAsync(accountPrivateKey);
    setPrivateKeyCopied(true);
  };

  const navigation = useNavigation<any>();

  console.log("accountPrivateKey", accountPrivateKey);
  console.log("accountPublicKey", accountPublicKey);

  useEffect(() => {
    let hexPrivateKey = generatePrivateKey();
    let hexPublicKey = getPublicKey(hexPrivateKey);

    let publicKey = Buffer.from(hexPublicKey, "hex");
    let privateKey = Buffer.from(hexPrivateKey, "hex");

    let nostrPublicKey = base58.encode(
      Buffer.concat([Buffer.from([23]), publicKey])
    );
    let nostrPrivateKey = base58.encode(
      Buffer.concat([Buffer.from([32]), privateKey])
    );

    setAccountPrivateKey(`nsec1${nostrPrivateKey}`);
    setAccountPublicKey(`npub1${nostrPublicKey}`);
    connectAccount(`npub1${nostrPublicKey}`, `nsec1${nostrPrivateKey}`);
  }, []);

  const onContinuePress = async () => {
    if (privateKeyCopied && publicKeyCopied) {
      navigation.navigate("Keys");
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

export default Keys;
