import React, {useCallback, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createRoomStyles as styles} from './createRoomStyles';
import {handleUsernameChange as handleUsernameChangeUtil} from '../../utils/usernameHandlers';

const CreateRoom = (props: {onClose: () => void}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [hasValidUsername, setHasValidUsername] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [usernameStatus, setUsernameStatus] = useState('');
  const [about, setAbout] = useState('');
  const maxLength = 40;

  const onCreateRoomPress = async () => {
    if (!hasValidUsername) {
      Alert.alert('Username has to be longer than 4 characters');
      return;
    }
    // placeholder to insert action to create room here
  };
  const handleUsernameChange = useCallback(
    (text: string) => {
      handleUsernameChangeUtil(
        text,
        setUsername,
        setHasValidUsername,
        setUsernameStatus,
        setTypingTimeout,
        typingTimeout,
      );
    },
    [typingTimeout],
  );

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
        <Text style={styles.label}>Room username </Text>
        <View style={styles.usernameContainer}>
          <TextInput
            style={[styles.input, {...styles.usernameInput}]}
            placeholder="@username"
            onChangeText={handleUsernameChange}
            maxLength={maxLength}
            value={username}
          />
          {usernameStatus === 'usernameTooShort' && (
            <Icon name="error" style={styles.errorIcon} />
          )}
          {usernameStatus === 'valid' && (
            <Icon name="done" style={styles.doneIcon} />
          )}
        </View>
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
