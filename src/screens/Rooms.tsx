// Room.tsx
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, Modal} from 'react-native';
import {styles} from './styles';
import CreateRoom from './CreateRoom';
import {IRoom} from '../utils/types';
import {Button} from '../components/Button';
import {PRIMARY_COLOR} from '../utils/colors';
import useNostr from '../nostr/useNostr';

const Rooms = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {getRooms, rooms} = useNostr();

  useEffect(() => {
    getRooms();
  }, []);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const renderRooms = ({item}: {item: IRoom}) => {
    return (
      <View key={item.id} style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>{item.username}</Text>
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
