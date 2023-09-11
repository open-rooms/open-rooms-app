import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {welcomeText} from '../../texts/welcomeText';
import {welcomeStyles as styles} from './welcomeStyles';

export function Welcome() {
  const navigation = useNavigation<any>();
  const welcomeTitle = 'Open Rooms';

  const onCreateAccountPress = () => {
    navigation.navigate('Eula', {screen: 'GenerateKeys'});
  };

  const onLoginPress = () => {
    navigation.navigate('Eula', {screen: 'Login'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{welcomeTitle} </Text>
        <Text style={styles.subtitle}>{welcomeText} </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onCreateAccountPress}>
          <Text style={styles.primaryButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onLoginPress}>
          <Text style={styles.secondaryButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Welcome;
