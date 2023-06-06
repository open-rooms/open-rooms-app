import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createRoomStyles as styles} from './createRoomStyles';

const CreateRoom = (props: {onClose: () => void}) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const maxLength = 40;

  const onCreateRoomPress = async () => {
    if (!name || !about) {
      Alert.alert('Please fill out all fields');
      return;
    }
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
        onPress={onCreateRoomPress}>
        <Text style={styles.primaryButtonText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRoom;
