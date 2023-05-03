import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {IRoom} from '../../utils/types';

interface EditRoomProps {
  room: IRoom;
  onUpdate: (updatedRoom: IRoom) => void;
}

export function EditRoom({room, onUpdate}: EditRoomProps) {
  const [name, setName] = useState(room.name);
  const [username, setUsername] = useState(room.username);
  const [about, setAbout] = useState(room.about);

  const handleUpdate = () => {
    const updatedRoom = {
      ...room,
      name,
      username,
      about,
    };
    onUpdate(updatedRoom);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter room name"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter room username"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>About:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={about}
          onChangeText={setAbout}
          placeholder="Enter room description"
          multiline
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Room</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default EditRoom;
