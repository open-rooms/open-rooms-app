import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePic from '../../components/ProfilePic';
import ProposalStatus from '../../components/ProposalStatus';
import CreateProposal from '../CreateProposal/CreateProposal';
import { getTimePassed } from '../../utils/time';
import { IRoom, RootStackParamList } from '../../utils/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { roomStyles as styles } from './roomStyles';
import { fetchProposals, storedProposals } from '../../redux/proposals-slice';
import { AppDispatch } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/rootReducer';
import { AnyAction } from 'redux';

const RoomHeader = ({
  room,
  isCreator,
  isJoined,
  setIsJoined,
  onUpdate,
}: any) => {
  console.log("Received room data in RoomHeader component:", room);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  // Your handleEditRoom function
  const handleEditRoom = () => {
    console.log('Edit room');
    navigation.navigate('EditRoom', {
      room,
      onUpdate,
    });
  };

  // Your handleJoinRoom function
  const handleJoinRoom = () => {
    setIsJoined((prevIsJoined: any) => !prevIsJoined);
    if (isJoined) {
      console.log('Leave room');
    } else {
      console.log('Join room');
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
  console.log("Received proposal in Proposal component:", proposal);
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
      <View style={styles.proposalProfileContainer}>
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

export function Room({ route }: any) {
  console.log('Route Params:', route.params);
  const navigation = useNavigation();
  const { roomName, roomAbout, roomMembers } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

 

  const proposals = useSelector(storedProposals);
  console.log('Redux Proposals:', proposals);

  const handleUpdateRoom = (updatedRoom: IRoom) => {
    console.log('Updated room:', updatedRoom);
  };

  const handleScroll = ({ nativeEvent }: any) => {
    console.log('Scroll event:', nativeEvent.contentOffset.y);
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchProposals());
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: showHeaderTitle ? roomName : '',
    });
  }, [navigation, roomName, showHeaderTitle]);

  return (
    <View style={styles.container}>
      {proposals && proposals.length > 0 ? (
        <FlatList
        data={proposals}
        renderItem={({ item }) => <Proposal proposal={item} />}
        keyExtractor={item => item.id.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListHeaderComponent={
            <RoomHeader
              room={{
                roomName,
                roomAbout,
                roomMembers,
              }}
              isCreator={true}
              isJoined={isJoined}
              setIsJoined={setIsJoined}
              onUpdate={handleUpdateRoom}
            />
          }
        />
      ) : (
        <Text>No proposals to display.</Text>
      )}

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CreateProposal onClose={onModalClose} />
        </View>
      </Modal>

      <View>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.primaryButtonText}>Create Proposal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Room;