import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../components/BackButton';
import {PRIMARY_COLOR} from '../utils/colors';
import {Button} from '../components/Button';

// display details of a Room/ roomName and roomUsername
export function Room() {
  const navigation = useNavigation<any>();
  const {roomName, roomUsername} = navigation.state.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
      headerTitle: '',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {roomName} </Text>
      <Text style={styles.text}> {roomUsername} </Text>
      <Button
        title={'Go to Feed'}
        onPress={() => navigation.navigate('Feed')}
        buttonColor={PRIMARY_COLOR}
        titleColor={'white'}
        buttonStyle={styles.button}
      />
    </View>
  );
}

export default Room;
