import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useStorage } from '../utils/useStorage';
import { RELAY_URL } from '../utils/constants';
import { subscribeEvents } from '../nostr/subscribeEvents';
import { styles } from './styles';
import { nip05 } from 'nostr-tools';

const Feed = () => {
  const [event, setEvent] = useState<any>([]);
  const privateKey = useStorage().privateKey;
  const url = RELAY_URL;
  const kind = 1;

  const onSubscribePress = async () => {
    try {
      const event = await subscribeEvents(kind, privateKey, url);

      setEvent(event);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('events are', event);

  return (
    <View>
      <Button title="Subscribe" onPress={onSubscribePress} />
      <Text style={styles.text}>{event.content}</Text>
    </View>
  );
};

export default Feed;
