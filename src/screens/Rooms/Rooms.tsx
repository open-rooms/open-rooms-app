import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, selectRooms, selectMyRooms } from '../../redux/rooms-slice';
import CreateRoom from '../CreateRoom/CreateRoom';
import ProfilePic from '../../components/ProfilePic';
import { formatStartDate } from '../../utils/time';
import { IRoom } from '../../utils/types';
import { roomsStyles as styles } from './roomsStyles';
import { AppDispatch } from '../../redux/store';
import { selectPrivateKey } from '../../redux/user-slice';
import { generatePublic } from '../../nostr-tools/generateKeys';

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
            <Text style={styles.itemUsername}>
              {` \u00B7 ${formattedStartDate}`}
            </Text>
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
  const navigation = useNavigation<any>();
  const dispatch: AppDispatch = useDispatch();
  const allRooms = useSelector(selectRooms);
  console.log("All Rooms from Redux Store:", allRooms);
  const myRooms = useSelector(selectMyRooms)
  console.log("My Rooms from Redux Store:", myRooms);
  const privKey = useSelector(selectPrivateKey);

  useEffect(() => {
    console.log("Redux State has changed:", allRooms, myRooms);
  }, [allRooms, myRooms]);
  

  // Local state variables
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'All' | 'My'>('All');

  // Derived public key
  const pubKey = generatePublic(privKey);

  // Fetch rooms on component mount
  const [isLoading, setIsLoading] = useState(true);

  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    setShouldFetch(true);
  }, [selectedOption]);
  
  useEffect(() => {
    if (shouldFetch) {
      dispatch(fetchRooms(selectedOption === 'My'))
        .then(() => {
          console.log("Rooms fetched successfully");
          setIsLoading(false);
          setShouldFetch(false);  // Set the flag to false
        })
        .catch(err => {
          console.error("Error fetching rooms:", err);
          setIsLoading(false);
        });
    }
  }, [dispatch, selectedOption, shouldFetch]);  // Use shouldFetch in the dependency array
  


  const roomsToDisplay = selectedOption === 'My' ? myRooms : allRooms;

  // Function to toggle between 'All' and 'My' rooms
  const handleToggleOption = (option: 'All' | 'My') => {
    setSelectedOption(option);
  };

  // Function to render a single room item
  const renderRoomItem = ({ item }: { item: IRoom }) => (
    <RoomItem
      item={item}
      onPress={() => navigation.navigate('Room', { room: item })}
    />
  );

  return (
    <View style={styles.container}>
      {/* Toggle between 'All' and 'My' rooms */}
      <View style={styles.toggleContainer}>
        {['All', 'My'].map(option => (
          <TouchableOpacity key={option} onPress={() => handleToggleOption(option as 'All' | 'My')}>
            <Text style={selectedOption === option ? styles.toggleTextSelected : styles.toggleText}>
              {`${option} Rooms`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List of rooms */}
      {isLoading ? <Text>Loading...</Text> : (
      <FlatList
    data={roomsToDisplay}
    renderItem={renderRoomItem}
    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
    ListEmptyComponent={<Text>No Rooms Available</Text>}
    />
      )}
  
      {/* Create Room Modal */}
      <Modal visible={isModalVisible} animationType="slide">
        <CreateRoom onClose={() => setIsModalVisible(false)} />
      </Modal>

      {/* Create Room Button */}
      <View>
        <TouchableOpacity style={styles.primaryButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.primaryButtonText}>Create Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Rooms;
