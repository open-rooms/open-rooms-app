// Feed.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useStorage } from "../utils/useStorage";
import { RELAY_URL } from "../utils/constants";
import { subscribeEvents } from "../nostr/subscribeEvents";
import { styles } from "./styles";
import { nip05 } from "nostr-tools";
import { useNavigation } from "@react-navigation/native";

const Feed = () => {
  const [event, setEvent] = useState<any>([]);
  const storage = useStorage();
  const privateKey = storage.privateKey;

  const url = RELAY_URL;
  const kind = 1;

  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!privateKey) {
      // Redirect to Welcome screen if private key is not found in local storage
      navigation.navigate("Welcome");
    }
  }, [privateKey]);

  const onSubscribePress = async () => {
    try {
      const event = await subscribeEvents(kind, privateKey, url);

      setEvent(event);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogoutPress = () => {
    // Clear private key from local storage and disconnect account
    storage.disconnectAccount();
    navigation.navigate("Welcome");
  };

  console.log("events are", event);

  return (
    <View>
      <Button title="Subscribe" onPress={onSubscribePress} />
      <Text style={styles.text}>{event.content}</Text>
      <Button title="Logout" onPress={onLogoutPress} />
    </View>
  );
};

export default Feed;
