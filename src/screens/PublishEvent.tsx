import React from 'react';
import {publishEvent} from '../nostr/publishEvent';
import {useStorage} from '../utils/useStorage';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import {RELAY_URL} from '../utils/constants';
import multiRelayPublish from '../nostr/multiRelayPublish';

export function PublishEvent() {
  const kind = 1;
  const [content, setContent] = useState<string>('');
  const privateKey = useStorage().privateKey;
  const url = RELAY_URL;
  const navitation = useNavigation<any>();

  console.log('privateKey', privateKey);
  console.log('url', url);
  console.log('kind', kind);
  console.log('content', content);

  const onPublishPress = async () => {
    try {
      await multiRelayPublish(kind, content, privateKey, url);
      navitation.navigate('Feed');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Kind: {kind}</Text>
      <Text>Url: {url}</Text>
      <Text>Proposal</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Enter proposal"
      />
      <Button title="Publish" onPress={onPublishPress} />
    </View>
  );
}

export default PublishEvent;
