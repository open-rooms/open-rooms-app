import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../components/Button';
import {generateKeys} from '../../nostr/utils/generateKeys';
import {useStorage} from '../../utils/useStorage';
import {copyToClipboard} from '../../utils/copyToClipboard';
import {PRIMARY_COLOR} from '../../utils/colors';
import {publicKeyText, privateKeyText} from '../../texts/registerText';
import {shortenKeys} from '../../utils/shortenKeys';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function CreateAccount() {
  const {connectAccount} = useStorage();
  const [username, setUsername] = useState('');
  const navigation = useNavigation<any>();
  const [prvKey, setPrvKey] = React.useState(
    'nsec15558b158124e5da8dd850c10533aa984aae38eb612a2bad225a8ccc896a34dc2',
  );
  const [pubKey, setPubKey] = React.useState(
    'npub1291f8dd2fa4f568eec41f6f202a75cd12394e8edfd66a3b2524c1d9f478bddd2',
  );
  const [privateKeyCopied, setPrivateKeyCopied] = React.useState(false);
  const [publicKeyCopied, setPublicKeyCopied] = React.useState(false);
  const accountPrivateKey = `nsec1${prvKey}`;
  const accountPublicKey = `npub1${pubKey}`;
  const shortPrivateKey = shortenKeys(accountPrivateKey, 30);
  const shortPublicKey = shortenKeys(accountPublicKey, 30);
  const publicKeyTitle = 'Public Key';
  const privateKeyTitle = 'Private Key';
  const [hasValidUsername, setHasValidUsername] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [usernameStatus, setUsernameStatus] = useState('');

  React.useEffect(() => {
    const {publicKey, privateKey} = generateKeys();
    setPrvKey(privateKey);
    setPubKey(publicKey);
  }, []);

  const onContinuePress = async () => {
    if (!hasValidUsername) {
      Alert.alert('Username has to be longer then 4 characters');
      return;
    }
    if (privateKeyCopied && publicKeyCopied) {
      connectAccount(pubKey, prvKey).then(() => {
        navigation.navigate('Rooms');
      });
    }
  };

  const handleUsernameChange = (text: string) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (!text.startsWith('@')) {
      setUsername('@' + text);
    } else {
      setUsername(text);
    }

    if (text.length < 4) {
      setHasValidUsername(false);
      setUsernameStatus('usernameTooShort');
    } else {
      const timeout = setTimeout(() => {
        setHasValidUsername(true);
        setUsernameStatus('valid');
      }, 1000);

      setTypingTimeout(timeout);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.inputTitle}> Username </Text>
      <View style={styles.usernameContainer}>
        <TextInput
          style={styles.usernameTextInput}
          placeholder="Username"
          onChangeText={handleUsernameChange}
          value={username}
        />
        {usernameStatus === 'usernameTooShort' && (
          <Icon name="error" style={styles.usernameWarningIcon} />
        )}
        {usernameStatus === 'valid' && (
          <Icon name="done" style={styles.usernameValidIcon} />
        )}
      </View>

      <Text style={styles.screenSubtitle}> {publicKeyTitle} </Text>
      <Text style={styles.screenText}> {publicKeyText} </Text>
      <TouchableOpacity
        onPress={() => {
          copyToClipboard(accountPublicKey);
          setPublicKeyCopied(true);
        }}>
        <Text style={styles.keys}>
          {' '}
          {shortPublicKey}{' '}
          {publicKeyCopied ? (
            <Icon name="done" style={styles.copyIcon} />
          ) : (
            <Icon name="content-copy" style={styles.copyIcon} />
          )}{' '}
        </Text>
      </TouchableOpacity>

      {publicKeyCopied && (
        <>
          <Text style={styles.screenSubtitle}> {privateKeyTitle} </Text>
          <Text style={styles.screenText}> {privateKeyText} </Text>

          <TouchableOpacity
            onPress={() => {
              copyToClipboard(accountPrivateKey);
              setPrivateKeyCopied(true);
            }}>
            <Text style={styles.keys}>
              {' '}
              {shortPrivateKey}{' '}
              {privateKeyCopied ? (
                <Icon name="done" style={styles.copyIcon} />
              ) : (
                <Icon name="content-copy" style={styles.copyIcon} />
              )}{' '}
            </Text>
          </TouchableOpacity>
        </>
      )}
      {privateKeyCopied && publicKeyCopied && (
        <Button
          title="Continue"
          onPress={onContinuePress}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.mainButton}
        />
      )}
    </View>
  );
}

export default CreateAccount;
