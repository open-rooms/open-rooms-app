import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable, Modal} from 'react-native';
import styles from './styles';
import ProfilePic from '../../components/ProfilePic';
import {useNavigation} from '@react-navigation/native';
import {getTimePassed} from '../../utils/time';
import {StackNavigationProp} from '@react-navigation/stack';
import {IRoom, RootStackParamList} from '../../utils/types';
import {PRIMARY_COLOR} from '../../utils/colors';
import CreateProposal from '../CreateProposal/CreateProposal';
import Button from '../../components/Button';
import ProposalStatus from '../../components/ProposalStatus';

//fake data
import fakeProposals from '../../utils/fakeProposals.json';

const RoomHeader = ({
  room,
  isCreator,
  isJoined,
  setIsJoined,
  onUpdateRoom,
}: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Update the handleEditRoom function
  const handleEditRoom = () => {
    console.log('Edit room');
    navigation.navigate('EditRoom', {
      room,
      onUpdate: onUpdateRoom, // Change the parameter name to onUpdate
    });
  };

  const handleJoinRoom = () => {
    setIsJoined(!isJoined);
    if (isJoined) {
      console.log('Leave room');
      // Implement the logic for leaving the room
    } else {
      console.log('Join room');
      // Implement the logic for joining the room
    }
  };

  return (
    <View style={styles.roomContainer}>
      <View style={styles.roomHeaderContainer}>
        <ProfilePic style={styles.roomPictureContainer} />
        <View style={styles.roomActionContainer}>
          {isCreator ? (
            <Button
              title="Edit Room"
              onPress={handleEditRoom}
              buttonColor={PRIMARY_COLOR}
              titleColor={'white'}
              buttonStyle={styles.roomActionButton}
            />
          ) : (
            <Button
              title={isJoined ? 'Joined' : 'Join'}
              onPress={handleJoinRoom}
              buttonColor={isJoined ? 'white' : PRIMARY_COLOR}
              titleColor={isJoined ? PRIMARY_COLOR : 'white'}
              buttonStyle={styles.roomActionButton}
            />
          )}
        </View>
      </View>
      <View style={styles.roomNameContainer}>
        <Text style={styles.roomTitle}>{room.roomName}</Text>
        <Text style={styles.roomUsername}>{room.roomUsername}</Text>
      </View>
      <Text style={styles.roomAbout}>{room.roomAbout}</Text>
      <Text style={styles.roomMembers}>{room.roomMembers} Members </Text>
    </View>
  );
};

const Proposal = ({proposal}: any) => {
  const timePassed = getTimePassed(proposal.start_date);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Room'>>();

  const handleProposalPress = () => {
    navigation.navigate('Proposal', {proposal});
  };

  return (
    <Pressable
      key={proposal.id}
      style={styles.proposalContainer}
      onPress={handleProposalPress}>
      <View style={styles.porposalProfileContainer}>
        <ProfilePic style={styles.profilePictureContainer} />
        <View style={styles.proposalTextContainer}>
          <Text style={styles.proposalCreator}>{proposal.creator}</Text>
          <View style={styles.proposalTitleContainer}>
            <Text style={styles.proposalTitle}>{proposal.proposal}</Text>
          </View>
          <ProposalStatus status={proposal.status} timePassed={timePassed} />
        </View>
      </View>
    </Pressable>
  );
};

export function Room({route}: any) {
  const {roomName, roomUsername, roomAbout, roomMembers} = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const handleUpdateRoom = (updatedRoom: IRoom) => {
    // Handle the room update here
    console.log('Updated room:', updatedRoom);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: showHeaderTitle ? roomName : '',
    });
  }, [navigation, roomName, showHeaderTitle]);

  const handleScroll = ({nativeEvent}: any) => {
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={fakeProposals}
        renderItem={({item}) => <Proposal proposal={item} />}
        keyExtractor={item => item.id}
        style={styles.proposalsListContainer}
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
            isCreator={true} // Change this to your actual logic to determine if the user is the creator
            isJoined={isJoined}
            setIsJoined={setIsJoined}
            onUpdateRoom={handleUpdateRoom} // Pass handleUpdateRoom as a prop
          />
        }
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CreateProposal onClose={onModalClose} />
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Proposal"
          onPress={() => setIsModalVisible(true)}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.createProposalButtonContainer}
        />
      </View>
    </View>
  );
}

export default Room;
