import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import ProfilePic from '../../components/ProfilePic';
import fakeProposals from '../../utils/fakeProposals.json';
import {useNavigation} from '@react-navigation/native';
import {getTimePassed} from '../../utils/time';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../utils/types';

const RoomHeader = ({room}: any) => (
  <View style={styles.profileContainer}>
    <ProfilePic style={styles.profilePictureContainer} />
    <Text style={styles.screenTitle}> {room.roomName} </Text>
    <Text style={styles.usernameText}> {room.roomUsername} </Text>
    <Text style={styles.dateText}> {room.roomDate} </Text>
    <Text style={styles.aboutText}> {room.roomAbout} </Text>
    <Text style={styles.membersText}>{room.roomMembers} Members </Text>
  </View>
);

const Proposal = ({proposal}: any) => {
  const timePassed = getTimePassed(proposal.start_date);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Room'>>();
  const handleProposalPress = () => {
    navigation.navigate('Proposal', {proposal});
  };

  const getStatusIndicatorColor = () => {
    switch (proposal.status) {
      case 'live':
        return 'green';
      case 'passed':
        return 'blue';
      case 'rejected':
        return 'red';
      default:
        return 'transparent';
    }
  };

  return (
    <View
      key={proposal.id}
      style={styles.proposalContainer}
      onTouchEnd={handleProposalPress}>
      <ProfilePic style={styles.profilePictureContainer} />
      <Text style={styles.proposalDetails}>{proposal.creator}</Text>
      <Text style={styles.proposalTitle}>{proposal.proposal}</Text>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusIndicator,
            {backgroundColor: getStatusIndicatorColor()},
          ]}
        />
        <Text style={styles.proposalDetails}>
          {`${proposal.status} \u00B7 ${timePassed}`}
        </Text>
      </View>
    </View>
  );
};

export function Room({route}: any) {
  const {roomName, roomUsername, roomAbout, roomMembers} = route.params;
  const navigation = useNavigation();
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  const handleScroll = ({nativeEvent}: any) => {
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: showHeaderTitle ? roomName : '',
    });
  }, [navigation, roomName, showHeaderTitle]);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={fakeProposals}
        renderItem={({item}) => <Proposal proposal={item} />}
        keyExtractor={item => item.id}
        style={styles.proposalsList}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <RoomHeader
            room={{
              roomName,
              roomUsername,
              roomAbout,
              roomMembers,
            }}
          />
        }
      />
    </View>
  );
}

export default Room;
