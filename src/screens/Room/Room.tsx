import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable, Modal} from 'react-native';
import styles from './styles';
import ProfilePic from '../../components/ProfilePic';
import {useNavigation} from '@react-navigation/native';
import {getTimePassed} from '../../utils/time';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../utils/types';
import {PRIMARY_COLOR} from '../../utils/colors';
import CreateProposal from '../CreateProposal/CreateProposal'; // Change this line

// Fake data
import fakeProposals from '../../utils/fakeProposals.json';
import Button from '../../components/Button';

const RoomHeader = ({room}: any) => (
  <View style={styles.roomContainer}>
    <ProfilePic style={styles.roomPictureContainer} />
    <View style={styles.roomNameContainer}>
      <Text style={styles.roomTitle}>{room.roomName}</Text>
      <Text style={styles.roomUsername}>{room.roomUsername}</Text>
    </View>
    <Text style={styles.roomAbout}>{room.roomAbout}</Text>
    <Text style={styles.roomMembers}>{room.roomMembers} Members </Text>
  </View>
);

const ProposalStatus = ({status, timePassed}: any) => {
  const getStatusIndicatorColor = () => {
    switch (status) {
      case 'live':
        return 'green';
      case 'passed':
        return PRIMARY_COLOR;
      case 'rejected':
        return 'red';
      default:
        return 'transparent';
    }
  };

  return (
    <View style={styles.proposalStatusContainer}>
      <View
        style={[
          styles.proposalStatusIndicator,
          {backgroundColor: getStatusIndicatorColor()},
        ]}
      />
      <Text style={styles.proposalStatus}>
        {`${status} \u00B7 ${timePassed}`}
      </Text>
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
