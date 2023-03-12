// Room.tsx
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Modal} from 'react-native';
import {useStorage} from '../utils/useStorage';
import {styles} from './styles';
import CreateRoom from './CreateRoom';
import {IRoom} from '../utils/types';
import {Button} from '../components/Button';
import {PRIMARY_COLOR} from '../utils/colors';
import {RELAYS_URL} from '../utils/constants';
import {multiRelaysSubscribe} from '../nostr/multiRelayInteractions';

const Rooms = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {privateKey} = useStorage();
  const relays = RELAYS_URL;
  const kind = 1;
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(relays[0]);
        const json = await res.json();
        const roomData = json.data;
        const fetchedRooms = roomData.map((room: any) => ({
          id: room.id,
          name: room.name,
          username: room.username,
        }));
        setRooms(fetchedRooms);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();

    const sub = multiRelaysSubscribe(
      kind,
      privateKey,
      relays,
      (event: any) => {
        const {name, username} = JSON.parse(event.content);
        setRooms(prevRooms => [
          ...prevRooms.filter(room => room.id !== event.id),
          {id: event.id, name: name, username: username},
        ]);
      },
      () => {
        console.log('Subscription ended');
        sub.unsub();
      },
    );

    return () => {
      sub.unsub();
    };
  }, [kind, privateKey, relays]);

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
          <CreateRoom onClose={onModalClose} setEvents={setRooms} />
        </View>
      </Modal>
      <View style={styles.buttonsContainer}>{renderCreateRoom()}</View>
    </View>
  );
};

export default Rooms;
