import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

export function Room({route}: any) {
  const {roomName, roomUsername} = route.params;

  return (
    <View style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.screenTitle}> {roomName} </Text>
        <Text style={styles.usernameText}> {roomUsername} </Text>
      </View>
    </View>
  );
}

export default Room;
