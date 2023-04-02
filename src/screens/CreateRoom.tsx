import React, {useState} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {styles} from './styles';
import {Button} from '../components/Button';
import {PRIMARY_COLOR} from '../utils/colors';
import useNostrRooms from '../nostr/useNostrRooms';
import RandomRobot from '../components/RandomRobot';
import useNostr from '../nostr/useNostr';

const CreateRoom = (props: {onClose: () => void}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const {publishRoom, publishProposal} = useNostr();

  const kind = 1;
  const fields = {
    name,
    username,
    imageUrl,
  };

  const onCreateRoomPress = async () => {
    try {
      publishRoom(kind, fields, [], () => {
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

  const hasImageUrl = imageUrl.trim().length > 0;

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
      {hasImageUrl ? (
        <View style={{marginBottom: 20}}>
          <Text style={styles.text}>Preview:</Text>
          <View style={[styles.robotContainer, {backgroundColor: '#fff'}]}>
            <View style={styles.robotImageContainer}>
              <RandomRobot style={styles.robotImage} seed={imageUrl} />
            </View>
            <View style={styles.robotDetailsContainer}>
              <Text style={styles.robotName}>{name}</Text>
              <Text style={styles.robotUsername}>@{username}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{marginBottom: 20}}>
          <Text style={styles.text}>Preview:</Text>
          <View style={[styles.robotContainer, {backgroundColor: '#fff'}]}>
            <View style={styles.robotImageContainer}>
              <RandomRobot style={styles.robotImage} />
            </View>
            <View style={styles.robotDetailsContainer}>
              <Text style={styles.robotName}>{name}</Text>
              <Text style={styles.robotUsername}>@{username}</Text>
            </View>
          </View>
        </View>
      )}

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
