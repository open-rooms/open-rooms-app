// Feed.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useStorage} from '../utils/useStorage';
import {RELAY_URL} from '../utils/constants';
import {subscribeEvents} from '../nostr/subscribeEvents';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const Feed = () => {
  const [event, setEvent] = useState<any>([]);

  const {privateKey, disconnectAccount} = useStorage();

  const url = RELAY_URL;
  const kind = 1;

  const navigation = useNavigation<any>();

  const onSubscribePress = async () => {
    try {
      const eventValue = await subscribeEvents(kind, privateKey, url);

      setEvent(eventValue);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogoutPress = () => {
    // Clear private key from local storage and disconnect account
    disconnectAccount();
    navigation.navigate('Welcome');
  };

  console.log('events are', event);

  return (
    <View>
      <Button title="Subscribe" onPress={onSubscribePress} />
      <Text style={styles.text}>{event.content}</Text>
      <Button title="Logout" onPress={onLogoutPress} />
    </View>
  );
};

export default Feed;
