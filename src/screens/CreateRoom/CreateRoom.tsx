import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Button} from '../../components/Button';

import {PRIMARY_COLOR} from '../../utils/colors';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useNostr from '../../nostr/useNostr';
// import useNostrRooms from '../nostr/useNostrRooms';

const CreateRoom = (props: {onClose: () => void}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const {publishRoom, publishProposal} = useNostr();
  const [hasValidUsername, setHasValidUsername] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [usernameStatus, setUsernameStatus] = useState('');

  const kind = 1;
  const fields = {
    name,
    username,
    //  imageUrl,
    about: 'about',
    start_date: 111,
    creator: 'creator',
    users: ['sadsf', 'fsds'],
  };

  const onCreateRoomPress = async () => {
    try {
      publishRoom(kind, JSON.stringify(fields), [], () => {
        console.log('room Published');
      });

      // just for testing
      // publishProposal(kind, fields, [['#t', 'roomId']], () => {
      //   console.log('room Published');
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateProposalPress = async () => {
    if (!hasValidUsername) {
      Alert.alert('Username has to be longer then 4 characters');
      return;
    }
    try {
      publishRoom(kind, JSON.stringify(fields), [], () => {
        console.log('room Published');
      });

      // just for testing
      publishProposal(kind, fields, [['#t', 'roomId']], () => {
        console.log('room Published');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsernameChange = (text: string) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (!text.startsWith('@')) {
      setUsername('@' + text);
    } else {
      setUsername(text);
    }

    if (text.length < 4) {
      setHasValidUsername(false);
      setUsernameStatus('usernameTooShort');
    } else {
      const timeout = setTimeout(() => {
        setHasValidUsername(true);
        setUsernameStatus('valid');
      }, 1000);

      setTypingTimeout(timeout);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <TouchableOpacity onPress={props.onClose}>
          <Icon name="close" style={styles.closeModalIcon} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Create Room</Text>
        <Text style={styles.fieldTitle}> Room name </Text>
        <TextInput
          style={styles.textInput}
          placeholder="My Community"
          onChangeText={text => setName(text)}
          value={name}
        />
        <Text style={styles.fieldTitle}> Room username </Text>
        <View style={styles.usernameContainer}>
          <TextInput
            style={styles.usernameTextInput}
            placeholder="@username"
            onChangeText={handleUsernameChange}
            value={username}
          />
          {usernameStatus === 'usernameTooShort' && (
            <Icon name="error" style={styles.usernameWarningIcon} />
          )}
          {usernameStatus === 'valid' && (
            <Icon name="done" style={styles.usernameValidIcon} />
          )}
        </View>
      </View>
      <Button
        title="Create Room"
        onPress={onCreateRoomPress}
        buttonColor={PRIMARY_COLOR}
        titleColor={'white'}
        buttonStyle={styles.createRoomButtonContainer}
      />
    </View>
  );
};

export default CreateRoom;
