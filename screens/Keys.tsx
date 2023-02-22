import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { useStorage } from "../utils/storage-context";
import * as Clipboard from "expo-clipboard";

export function Keys({ route }: any) {
  const navigation = useNavigation<any>();

  const accountPublicKey = useStorage().accountPublicKey;
  const [publicKeyCopied, setPublicKeyCopied] = React.useState(false);
  const publicKeyTitle = "Public Key";
  const publicKeyText = `
This is your account ID. Save it, otherwise you will not be able to log in the future if you uninstall the app.`;

  const accountPrivateKey = useStorage().accountPrivateKey;
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
        <Button
          title="Continue"
          onPress={() => navigation.navigate("Welcome")}
        ></Button>
      )}
    </View>
  );
}

export default Keys;
