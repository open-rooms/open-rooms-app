import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import ProfilePic from '../../components/ProfilePic';
import {useNavigation} from '@react-navigation/native';
import {getTimePassed} from '../../utils/time';
import {StackNavigationProp} from '@react-navigation/stack';
import {IRoom, RootStackParamList} from '../../utils/types';
import CreateProposal from '../CreateProposal/CreateProposal';
import ProposalStatus from '../../components/ProposalStatus';
import {roomStyles as styles} from './roomStyles';

//fake data
import fakeProposals from '../../utils/fakeProposals.json';

const RoomHeader = ({
  room,
  isCreator,
  isJoined,
  setIsJoined,
  onUpdate,
}: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Update the handleEditRoom function
  const handleEditRoom = () => {
    console.log('Edit room');
    navigation.navigate('EditRoom', {
      room,
      onUpdate: onUpdate, // Change the parameter name to onUpdate
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
        <ProfilePic style={styles.roomPicture} />
        <View style={styles.roomActionContainer}>
          {isCreator ? (
            <TouchableOpacity
              style={styles.secondarySmallButton}
              onPress={handleEditRoom}>
              <Text style={styles.secondaryButtonText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleJoinRoom}
              style={
                isJoined
                  ? styles.secondarySmallButton
                  : styles.primarySmallButton
              }>
              <Text
                style={
                  isJoined
                    ? styles.secondaryButtonText
                    : styles.primaryButtonText
                }>
                {isJoined ? 'Joined' : 'Join'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.roomNameContainer}>
        <Text style={styles.roomName}>{room.roomName}</Text>
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
        <ProfilePic style={styles.profilePicture} />
        <View style={styles.proposalTextContainer}>
          <Text style={styles.proposalCreator}>{proposal.creator}</Text>
          <View style={styles.proposalTitleContainer}>
            <Text style={styles.proposalTitle}>{proposal.proposal}</Text>
            <ProposalStatus status={proposal.status} timePassed={timePassed} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export function Room({route}: any) {
  const {roomName, roomAbout, roomMembers} = route.params;
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
    <View style={styles.container}>
      <FlatList
        data={fakeProposals}
        renderItem={({item}) => <Proposal proposal={item} />}
        keyExtractor={item => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <RoomHeader
            room={{
              roomName,
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
      <View>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.primaryButtonText}>Create Proposal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Room;
