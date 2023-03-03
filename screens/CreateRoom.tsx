import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStorage } from "../utils/useStorage";
import { publish } from "../nostr/publish";
import { styles } from "./styles";
import { Button } from "../components/Button";
import { PRIMARY_COLOR } from "../utils/colors";
import { RELAY_URL } from "../utils/constants";

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigation = useNavigation<any>();
  const url = RELAY_URL;
  const kind = 1;
  const fields = {
    name,
    username,
  };
  const tags = [["t", "white-room"]];
  const { privateKey } = useStorage();

  const onCreateRoomPress = async () => {
    try {
      await publish(kind, privateKey, url, fields, tags);
      navigation.navigate("Feed");
    } catch (error) {
      console.log(error);
    }
  };

  function setRelayUrl(text: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Room</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Room Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Room Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Image URL"
        onChangeText={(text) => setImageUrl(text)}
        value={imageUrl}
      />
      <Button
        title="Create Room"
        onPress={onCreateRoomPress}
        buttonColor={"white"}
        titleColor={PRIMARY_COLOR}
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default CreateRoom;
