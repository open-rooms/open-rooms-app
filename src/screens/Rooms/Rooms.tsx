import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, selectRooms, selectMyRooms } from '../../redux/rooms-slice';
import { formatStartDate } from '../../utils/time';
import { IRoom } from '../../utils/types';
import { roomsStyles as styles } from './roomsStyles';
import { AppDispatch } from '../../redux/store';
import CreateRoom from '../CreateRoom/CreateRoom';
import ProfilePic from '../../components/ProfilePic';

// Renders a single room item
const RoomItem = ({ item, onPress }: { item: IRoom; onPress: () => void }) => {
  const formattedStartDate = formatStartDate(item.created_at);
  return (
    <View key={item.id} style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.itemProfile}>
          <ProfilePic style={styles.itemPicture} />
          <View style={styles.itemText}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemUsername}>{` \u00B7 ${formattedStartDate}`}</Text>
          </View>
        </View>
        <View style={styles.itemAbout}>
          <Text style={styles.itemDescription}>{item.about}</Text>
          <Text style={styles.itemMembers}>{`Members`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Rooms = () => {
  const navigation = useNavigation<any>(); // Specify the type if necessary
  const dispatch = useDispatch<AppDispatch>();
  const allRooms = useSelector(selectRooms);
  const myRooms = useSelector(selectMyRooms);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<'All' | 'My'>('All');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchRooms()) // Call without argument
      .finally(() => setIsLoading(false));
  }, [dispatch, selectedOption]);

  const roomsToDisplay = selectedOption === 'My' ? myRooms : allRooms;

  const handleToggleOption = (option: 'All' | 'My') => {
    setSelectedOption(option);
  };

  const renderRoomItem = ({ item }: { item: IRoom }) => (
    <RoomItem
      item={item}
      onPress={() => navigation.navigate('Room', { room: item })} // Ensure this matches your navigation structure
    />
  );


  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {(['All', 'My'] as const).map(option => ( // Use 'as const' to infer literal types
          <TouchableOpacity key={option} onPress={() => handleToggleOption(option)}>
            <Text style={selectedOption === option ? styles.toggleTextSelected : styles.toggleText}>
              {`${option} Rooms`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? <Text>Loading...</Text> : (
        <FlatList
          data={roomsToDisplay}
          renderItem={renderRoomItem}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          ListEmptyComponent={<Text>No Rooms Available</Text>}
        />
      )}

      <Modal visible={isModalVisible} animationType="slide">
        <CreateRoom onClose={() => setIsModalVisible(false)} />
      </Modal>

      <View>
        <TouchableOpacity style={styles.primaryButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.primaryButtonText}>Create Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Rooms;
