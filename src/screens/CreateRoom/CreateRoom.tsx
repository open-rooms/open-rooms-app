import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
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

  return (
    <View style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <TouchableOpacity onPress={props.onClose}>
          <Icon name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Room</Text>
        <Text style={styles.inputTitle}> Room name </Text>
        <TextInput
          style={styles.inputText}
          placeholder="My Community"
          onChangeText={text => setName(text)}
          value={name}
        />
        <Text style={styles.inputTitle}> Room username </Text>
        <TextInput
          style={styles.inputText}
          placeholder="@MyCoommunity"
          onChangeText={text => setUsername(text)}
          value={username}
        />
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
