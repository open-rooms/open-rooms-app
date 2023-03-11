// CreateRoom.tsx

import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useStorage} from '../utils/useStorage';
import {singleRelayPublish} from '../nostr/singleRelayPublish';
import {styles} from './styles';
import {Button} from '../components/Button';
import {PRIMARY_COLOR} from '../utils/colors';
import {RELAY_URL} from '../utils/constants';

const CreateRoom = (props: {
  onClose: () => void;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const url = RELAY_URL;
  const kind = 1;
  const fields = {
    name,
    username,
  };
  const tags = [['t', 'white-room']];
  const {privateKey} = useStorage();

  const onCreateRoomPress = async () => {
    try {
      const event = await singleRelayPublish(
        kind,
        privateKey,
        url,
        fields,
        tags,
      );
      if (
        event.tags.some((tag: string | string[]) => tag.includes('white-room'))
      ) {
        props.setEvents((prevEvents: any) => [...prevEvents, event]);
      }
      props.onClose(); // Call the onClose function passed as a prop
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Create Room</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Room Name"
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Room Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Image URL"
          onChangeText={text => setImageUrl(text)}
          value={imageUrl}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Create Room"
          onPress={onCreateRoomPress}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.button}
        />
        <Button
          title="Close"
          onPress={props.onClose}
          buttonColor={'white'}
          titleColor={PRIMARY_COLOR}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default CreateRoom;
