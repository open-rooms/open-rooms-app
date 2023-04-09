import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {useStorage} from '../utils/useStorage';
import {Button} from '../components/Button';
import {PRIMARY_COLOR} from '../utils/colors';

export function Profile() {
  const {publicKey, privateKey, disconnectAccount} = useStorage();

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.screenTitle}>Profile</Text>
        <Text style={styles.text}>Public Key: {publicKey}</Text>
        <Text style={styles.text}>Private Key: {privateKey}</Text>

        <Button
          title="Logout"
          onPress={disconnectAccount}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
}

export default Profile;
