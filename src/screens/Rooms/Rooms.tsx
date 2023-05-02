import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CreateRoom from '../CreateRoom/CreateRoom';
import {Button} from '../../components/Button';
import ProfilePic from '../../components/ProfilePic';
import {formatStartDate} from '../../utils/time';
import {PRIMARY_COLOR} from '../../utils/colors';
import {IRoom} from '../../utils/types';
import {styles} from './styles';

// fake data
import rooms from '../../utils/fakeRooms.json';

const RoomItem = ({item, onPress}: {item: IRoom; onPress: () => void}) => {
  const formattedStartDate = formatStartDate(item.start_date);

  return (
    <View key={item.id} style={styles.roomContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.roomProfileContainer}>
          <ProfilePic style={styles.roomPictureContainer} />
          <View style={styles.roomTextContainer}>
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.roomUsername}>
              {`${item.username} \u00B7 ${formattedStartDate}`}
            </Text>
          </View>
        </View>
        <View style={styles.roomAboutContainer}>
          <Text style={styles.roomAbout}>{item.about}</Text>
          <Text
            style={styles.roomMembers}>{`${item.members.length} Members`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export function Rooms() {
  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const renderRooms = ({item}: {item: IRoom}) => {
    const formattedStartDate = formatStartDate(item.start_date);

    return (
      <RoomItem
        item={item}
        onPress={() =>
          navigation.navigate('Room', {
            roomId: item.id,
            roomName: item.name,
            roomUsername: item.username,
            roomAbout: item.about,
            roomMembers: item.members.length,
            roomDate: formattedStartDate,
          })
        }
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
        keyExtractor={item => item.id?.toString() || ''}
        style={styles.roomsListContainer}
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
      <View style={styles.buttonContainer}>
        <Button
          title="Create Room"
          onPress={() => setIsModalVisible(true)}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.createRoomButtonContainer}
        />
      </View>
    </View>
  );
}

export default Rooms;
