import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {Button} from '../components/Button';
import {PRIMARY_COLOR} from '../utils/colors';
import {welcomeText} from '../texts/welcomeText';

export function Welcome() {
  const navigation = useNavigation<any>();
  const welcomeTitle = 'White Room';

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}> {welcomeTitle} </Text>
        <Text style={styles.text}> {welcomeText} </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Create Account"
          onPress={() => navigation.navigate('Eula', {screen: 'CreateAccount'})}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.button}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate('Eula', {screen: 'Login'})}
          buttonColor={'white'}
          titleColor={PRIMARY_COLOR}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
}

export default Welcome;
