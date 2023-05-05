import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './editRoomStyles';
import {IRoom} from '../../utils/types';
import {useNavigation} from '@react-navigation/native';

interface EditRoomProps {
  room: IRoom;
  route: any;
  onUpdate: (updatedRoom: IRoom) => void;
  onDelete: () => void;
}

export function EditRoom({route}: EditRoomProps) {
  const {room, onUpdate, onDelete} = route.params;
  const navigation = useNavigation();

  const [name, setName] = useState(room.roomName);
  const [username, setUsername] = useState(room.roomUsername);
  const [about, setAbout] = useState(room.roomAbout);
  const [damusAccount, setDamusAccount] = useState(room.damusAccount || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(room.thumbnailUrl || '');

  const handleUpdate = () => {
    const updatedRoom = {
      ...room,
      roomName: name,
      roomUsername: username,
      roomAbout: about,
      damusAccount,
      thumbnailUrl,
    };
    onUpdate(updatedRoom);
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleDelete = () => {
    onDelete();
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Room</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Room name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter room name"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Room username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter room username"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>About room</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={about}
          onChangeText={setAbout}
          placeholder="Enter room description"
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Damus Account</Text>
        <TextInput
          style={styles.input}
          value={damusAccount}
          onChangeText={setDamusAccount}
          placeholder="Enter Damus account (optional)"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Thumbnail URL</Text>
        <TextInput
          style={styles.input}
          value={thumbnailUrl}
          onChangeText={setThumbnailUrl}
          placeholder="Enter thumbnail URL (optional)"
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleUpdate}>
        <Text style={styles.primaryButtonText}>Update Room</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Room</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default EditRoom;
