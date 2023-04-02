import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {PRIMARY_COLOR} from '../utils/colors';
import {Button} from '../components/Button';

// display details of a Room/ roomName and roomUsername
export function Room({route}: any) {
  const navigation = useNavigation<any>();
  const {roomName, roomUsername} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {roomName} </Text>
      <Text style={styles.text}> {roomUsername} </Text>
      <Button
        title={'Go to Feed'}
        onPress={() => navigation.navigate('Feed')}
        buttonColor={PRIMARY_COLOR}
        titleColor={'white'}
        buttonStyle={styles.button}
      />
    </View>
  );
}

export default Room;
