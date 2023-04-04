import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Modal, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import CreateRoom from './CreateRoom';
import {IRoom} from '../utils/types';
import {Button} from '../components/Button';
import {PRIMARY_COLOR} from '../utils/colors';
// import useNostr from '../nostr/useNostr';
import {useNavigation} from '@react-navigation/native';
import rooms from '../utils/fakeRooms.json';
import DecisionRoom from '../components/DecisionRoom';
import useNostr from '../nostr/useNostr';

const Rooms = () => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const {getRooms, rooms2} = useNostr();

  // useEffect(() => {
  //   getRooms();
  //   console.log('rooms2', rooms2);
  // }, []);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const renderRooms = ({item}: {item: IRoom}) => {
    const startDate = new Date(item.start_date * 1000);
    const formattedStartDate = startDate.toLocaleDateString();

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
          <DecisionRoom style={styles.robot} />

          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.textRooms}>{item.about}</Text>
          <Text style={styles.username}>{formattedStartDate}</Text>
          <Text style={styles.textRooms}>Members {item.users.length}</Text>
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
        buttonStyle={styles.button}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={renderRooms}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
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
