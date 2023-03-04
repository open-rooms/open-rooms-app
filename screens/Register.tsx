import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {generateKeys} from '../nostr/generateKeys';
import {useStorage} from '../utils/useStorage';
import {copyToClipboard} from '../utils/copyToClipboard';
import {BackButton} from '../components/BackButton';
import {PRIMARY_COLOR} from '../utils/colors';
import {publicKeyText, privateKeyText} from '../texts/registerText';
import {Button} from '../components/Button';

export function Register() {
  const {connectAccount} = useStorage();
  const navigation = useNavigation<any>();
  const [prvKey, setPrvKey] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [privateKeyCopied, setPrivateKeyCopied] = React.useState(false);
  const [publicKeyCopied, setPublicKeyCopied] = React.useState(false);
  const accountPrivateKey = `nsec1${prvKey}`;
  const accountPublicKey = `npub1${pubKey}`;
  const publicKeyTitle = 'Public Key';
  const privateKeyTitle = 'Private Key';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton color={PRIMARY_COLOR} style={styles.backButton} />
      ),
      headerTitle: '',
    });
  }, [navigation]);

  useEffect(() => {
    const {publicKey, privateKey} = generateKeys();
    setPrvKey(privateKey);
    setPubKey(publicKey);
    connectAccount(publicKey, privateKey);
  }, []);

  const copyPublicKeytoClipboard = async () => {
    copyToClipboard(accountPublicKey).then(status =>
      setPublicKeyCopied(status),
    );
  };

  const copyPrivateKeytoClipboard = async () => {
    copyToClipboard(accountPrivateKey).then(status =>
      setPrivateKeyCopied(status),
    );
  };

  const onContinuePress = async () => {
    if (privateKeyCopied && publicKeyCopied) {
      navigation.navigate('PublishEvent');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {publicKeyTitle} </Text>
      <Text style={styles.text}> {publicKeyText} </Text>
      <Text style={styles.text}> {accountPublicKey} </Text>

      <Button
        title={publicKeyCopied ? 'Done' : 'Copy Public Key'}
        onPress={copyPublicKeytoClipboard}
        buttonColor={publicKeyCopied ? 'white' : PRIMARY_COLOR}
        titleColor={publicKeyCopied ? PRIMARY_COLOR : 'white'}
        buttonStyle={styles.button}></Button>
      {publicKeyCopied && (
        <>
          <Text style={styles.title}> {privateKeyTitle} </Text>
          <Text style={styles.text}> {privateKeyText} </Text>
          <Text style={styles.text}> {accountPrivateKey} </Text>
          <Button
            title={privateKeyCopied ? 'Done' : 'Copy Private Key'}
            onPress={copyPrivateKeytoClipboard}
            buttonColor={privateKeyCopied ? 'white' : PRIMARY_COLOR}
            titleColor={privateKeyCopied ? PRIMARY_COLOR : 'white'}
            buttonStyle={styles.button}></Button>
        </>
      )}
      {privateKeyCopied && publicKeyCopied && (
        <Button
          title="Continue"
          onPress={onContinuePress}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.button}></Button>
      )}
    </View>
  );
}

export default Register;
