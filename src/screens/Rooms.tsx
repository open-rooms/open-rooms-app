import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import CreateRoom from './CreateRoom';
import {IRoom} from '../utils/types';
import {Button} from '../components/Button';
import {PRIMARY_COLOR} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import rooms from '../utils/fakeRooms.json';
import ProfilePic from '../components/ProfilePic';
import useNostr from '../nostr/useNostr';

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
      <View key={item.id} style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Room', {
              roomId: item.id,
              roomName: item.name,
              roomUsername: item.username,
            })
          }>
          <View style={styles.profileContainer}>
            <ProfilePic style={styles.robot} />
            <View style={styles.profileTextContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.username}>
                {`${item.username} \u00B7 ${formattedStartDate}`}
              </Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.textRooms}>{item.about}</Text>
            <Text
              style={styles.textRooms}>{`Members ${item.members.length}`}</Text>
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
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={renderRooms}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          showHeaderTitle ? null : (
            <Text style={{fontSize: 32, fontWeight: 'bold', marginBottom: 16}}>
              Rooms
            </Text>
          )
        }
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modal}>
          <CreateRoom onClose={onModalClose} />
        </View>
      </Modal>
      <View style={styles.buttonsContainer}>{renderCreateRoom()}</View>
    </View>
  );
};

export default Rooms;
