import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CreateRoom from '../CreateRoom/CreateRoom';
import ProfilePic from '../../components/ProfilePic';
import {formatStartDate} from '../../utils/time';
import {IRoom} from '../../utils/types';
import {roomsStyles as styles} from './roomsStyles';
import {useSelector} from 'react-redux';
import {storedRooms} from '../../redux/rooms-slice';

// uncomment this if you want to continue work
//import rooms from '../../utils/fakeRooms.json';
// you need to update the fake json. first element is the one that will be for room

// Room item component
const RoomItem = ({item, onPress}: {item: IRoom; onPress: () => void}) => {
  const formattedStartDate = formatStartDate(item.start_date);

  return (
    <View key={item.id} style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.itemProfile}>
          <ProfilePic style={styles.itemPicture} />
          <View style={styles.itemText}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemUsername}>
              {`${item.creator.username} \u00B7 ${formattedStartDate}`}
            </Text>
          </View>
        </View>
        <View style={styles.itemAbout}>
          <Text style={styles.itemDescription}>{item.about}</Text>
          <Text
            style={styles.itemMembers}>{`${item.members.length} Members`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Rooms component
export function Rooms() {
  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  // comment this if you want to continue work
  const rooms = useSelector(storedRooms);

  // Handle closing the modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // Render rooms in the list
  const renderRooms = ({item}: {item: IRoom}) => {
    const formattedStartDate = formatStartDate(item.start_date);

    return (
      <RoomItem
        item={item}
        onPress={() =>
          navigation.navigate('Room', {
            // pass the entire IRoom item like: room: item and in the next screen just use the entire object
            roomId: item.id,
            roomName: item.name,
            roomUsername: item.creator.username,
            roomAbout: item.about,
            roomMembers: item.members.length,
            roomDate: formattedStartDate,
          })
        }
      />
    );
  };

  // Set header title when scrolling
  useEffect(() => {
    navigation.setOptions({
      headerTitle: showHeaderTitle ? 'Rooms' : '',
    });
  }, [navigation, showHeaderTitle]);

  // Handle scrolling
  const handleScroll = ({nativeEvent}: any) => {
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  // Handle create room button press
  const onPressCreateRoom = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={renderRooms}
        keyExtractor={item => item.id?.toString() || ''}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          showHeaderTitle ? null : <Text style={styles.title}>Rooms</Text>
        }
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CreateRoom onClose={onModalClose} />
        </View>
      </Modal>
      <View>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onPressCreateRoom}>
          <Text style={styles.primaryButtonText}>Create Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Rooms;
