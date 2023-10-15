import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { fetchRooms } from '../../redux/rooms-slice';

import CreateRoom from '../CreateRoom/CreateRoom';
import ProfilePic from '../../components/ProfilePic';
import { formatStartDate } from '../../utils/time';
import { IRoom } from '../../utils/types';
import { roomsStyles as styles } from './roomsStyles';
import { AppDispatch } from '../../redux/store'
import { publicKey } from '../../redux/user-slice';

const RoomItem = ({ item, onPress }: { item: IRoom; onPress: () => void }) => {
  const formattedStartDate = formatStartDate(item.created_at);
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
          <Text style={styles.itemMembers}>{`${item.pubkey} Author`}</Text>
          <Text style={styles.itemMembers}>{`${item.members.length} Members`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Rooms = () => {
  const navigation = useNavigation<any>();
  const rooms = useSelector((state: RootState) => state.rooms.rooms);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const dispatch: AppDispatch = useDispatch();
  const allRooms = useSelector((state: RootState) => state.rooms.rooms);
  const [filteredRooms, setFilteredRooms] = useState<IRoom[]>([]);
  

  const pubKey = useSelector(publicKey);
  console.log("My public Key:", pubKey);  // Debug line

  useEffect(() => {
    if (selectedOption === 'My') {
      const myRooms = allRooms.filter(room => room.creator.pubkey === pubKey);
      console.log("My Rooms:", myRooms);  // Debug line
      console.log("All Rooms Data:", allRooms);  // Debug line
      setFilteredRooms(myRooms);
    } else {
      setFilteredRooms(allRooms);
    }
  }, [allRooms, selectedOption, pubKey]);
  

  useEffect(() => {
    navigation.setOptions({
      headerTitle: showHeaderTitle ? 'Rooms' : '',
    });
  }, [navigation, showHeaderTitle]);

  const handleFetchRooms = (option: string) => {
    const filterByAuthor = option === 'My';
    console.log("Filter by Author:", filterByAuthor);  // Add this line in handleFetchRooms
    dispatch(fetchRooms(filterByAuthor));
  };

  const handleToggleOption = (option: string) => {
    setSelectedOption(option);
    handleFetchRooms(option);
  };

  const handleScroll = ({ nativeEvent }: any) => {
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  const handlePressCreateRoom = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const renderRoomItem = ({ item }: { item: IRoom }) => (
    <RoomItem
      item={item}
      onPress={() => navigation.navigate('Room', { room: item })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {['All', 'My'].map((option) => (
          <TouchableOpacity key={option} onPress={() => handleToggleOption(option)}>
            <Text style={selectedOption === option ? styles.toggleTextSelected : styles.toggleText}>
              {`${option} Rooms`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
         data={filteredRooms} 
        renderItem={renderRoomItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={showHeaderTitle ? null : <Text style={styles.title}>Rooms</Text>}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CreateRoom onClose={handleModalClose} />
        </View>
      </Modal>

      <View>
        <TouchableOpacity style={styles.primaryButton} onPress={handlePressCreateRoom}>
          <Text style={styles.primaryButtonText}>Create Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Rooms;
