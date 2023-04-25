import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import ProfilePic from '../../components/ProfilePic';

export function Room({route}: any) {
  const {roomName, roomUsername, roomAbout, roomMembers, formattedStartDate} =
    route.params;

  return (
    <View style={styles.screenContainer}>
      <View style={styles.profileContainer}>
        <ProfilePic style={styles.profilePictureContainer} />
        <Text style={styles.screenTitle}> {roomName} </Text>
        <Text style={styles.usernameText}> {roomUsername} </Text>
        <Text style={styles.dateText}> {formattedStartDate} </Text>
        <Text style={styles.aboutText}> {roomAbout} </Text>
        <Text style={styles.membersText}>{roomMembers} Members </Text>
      </View>
    </View>
  );
}

export default Room;
