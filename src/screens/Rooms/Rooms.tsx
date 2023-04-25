import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import CreateRoom from '../CreateRoom/CreateRoom';
import {IRoom} from '../../utils/types';
import {Button} from '../../components/Button';
import {PRIMARY_COLOR} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import ProfilePic from '../../components/ProfilePic';

// data source
import useNostr from '../../nostr/useNostr';
import rooms from '../../utils/fakeRooms.json';

const Rooms = () => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const renderRooms = ({item}: {item: IRoom}) => {
    const startDate = new Date(item.start_date * 1000);
    const formattedStartDate = startDate.toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });

    return (
      <View key={item.id} style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Room', {
              roomId: item.id,
              roomName: item.name,
              roomUsername: item.username,
              roomAbout: item.about,
              roomMembers: item.members.length,
              roomDate: formattedStartDate,
            })
          }>
          <View style={styles.profileContainer}>
            <ProfilePic style={styles.profilePictureContainer} />
            <View style={styles.profileTextContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.usernameText}>
                {`${item.username} \u00B7 ${formattedStartDate}`}
              </Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.aboutText}>{item.about}</Text>
            <Text
              style={
                styles.membersText
              }>{`${item.members.length} Members`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCreateRoom = () => {
    return (
      <Button
        title="Create Room"
        onPress={() => setIsModalVisible(true)}
        buttonColor={PRIMARY_COLOR}
        titleColor={'white'}
        buttonStyle={styles.createRoomButtonContainer}
      />
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: showHeaderTitle ? 'Rooms' : '',
    });
  }, [navigation, showHeaderTitle]);

  const handleScroll = ({nativeEvent}: any) => {
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={rooms}
        renderItem={renderRooms}
        keyExtractor={item => item.id.toString()}
        style={styles.listContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          showHeaderTitle ? null : <Text style={styles.screenTitle}>Rooms</Text>
        }
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CreateRoom onClose={onModalClose} />
        </View>
      </Modal>
      <View style={styles.buttonsContainer}>{renderCreateRoom()}</View>
    </View>
  );
};

export default Rooms;
