import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createRoomStyles as styles } from './createRoomStyles';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../redux/rooms-slice';
import { ROOM_TAG } from '../../utils/constants';
import { useStorage } from '../../storage/useStorage';
import publishOnMultipleRelays from '../../nostr/publishOnMultipleRelays';

const CreateRoom = (props: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const dispatch = useDispatch();
  const maxLength = 40;

  // Define privateKey here
  const { privateKey } = useStorage(); 

  const onCreateRoomPress = async () => {
    // The privateKey variable is now directly accessible in this function

    if (!name || !about) {
      Alert.alert('Please fill out all fields');
      return;
    }

    const newRoom = {
      id: Math.random().toString(),
      name: name,
      about: about,
      start_date: Date.now(),
      creator: {
        id: '',
        pubKey: '',
        profilePicUrl: '',
        username: '',
        damus: '',
      },
      members: [],
      proposals: [],
    };

    const kind = 1;
    const fields = JSON.stringify(newRoom);
    const tags: string[][] = [ROOM_TAG];

    try {
      await publishOnMultipleRelays(kind, fields, tags, privateKey);
      dispatch(addRoom(newRoom));
    } catch (error) {
      console.error('Failed to create room:', error);
    }

    props.onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onClose}>
        <Icon name="close" style={styles.closeIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Create Room</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Room name </Text>
        <TextInput
          style={styles.input}
          placeholder="My Community"
          onChangeText={text => setName(text)}
          maxLength={maxLength}
          value={name}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>About room</Text>
        <TextInput
          style={[styles.input, styles.multiLineInput]}
          value={about}
          onChangeText={setAbout}
          placeholder="Enter room description"
          multiline
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onCreateRoomPress}
      >
        <Text style={styles.primaryButtonText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRoom;
