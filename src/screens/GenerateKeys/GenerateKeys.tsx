import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {generateKeysStyle as styles} from './generateKeysStyle';
import {generatePrivate, generatePublic} from '../../nostr-tools/generateKeys';
import {copyToClipboard} from '../../utils/copyToClipboard';
import {shortenKeys} from '../../utils/shortenKeys';
import {publicKeyText, privateKeyText} from '../../texts/registerText';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../utils/types';
import {useStorage} from '../../storage/useStorage';

function KeyItem({title, text, shortKey, keyCopied, onPress}: any) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.keys}>
          {shortKey}
          {keyCopied ? (
            <Icon name="done" style={styles.doneIcon} />
          ) : (
            <Icon name="content-copy" style={styles.copyIcon} />
          )}
        </Text>
      </TouchableOpacity>
    </>
  );
}

export function GenerateKeys() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'GenerateKeys'>>();

  const [prvKey, setPrvKey] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [privateKeyCopied, setPrivateKeyCopied] = useState(false);
  const [publicKeyCopied, setPublicKeyCopied] = useState(false);

  const accountPrivateKey = `nsec1${prvKey}`;
  const accountPublicKey = `npub1${pubKey}`;

  const shortPrivateKey = shortenKeys(accountPrivateKey, 40);
  const shortPublicKey = shortenKeys(accountPublicKey, 40);

  const {storePrivateKey} = useStorage();

  useEffect(() => {
    // This will run only once when the component mounts
    const privateKey = generatePrivate();
    const publicKey = generatePublic(privateKey);
    setPrvKey(privateKey);
    setPubKey(publicKey);
    if (storePrivateKey) {
      storePrivateKey(privateKey);
    }
  }, []); // Empty dependency array ensures this runs only once

  const onPublicKeyPress = () => {
    copyToClipboard(accountPublicKey);
    setPublicKeyCopied(true);
  };

  const onPrivateKeyPress = () => {
    copyToClipboard(accountPrivateKey);
    setPrivateKeyCopied(true);
  };

  const onContinuePress = () => {
    if (privateKeyCopied && publicKeyCopied) {
      navigation.navigate('CreateAccount', {prvKey});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <KeyItem
          title="Public Key"
          text={publicKeyText}
          shortKey={shortPublicKey}
          keyCopied={publicKeyCopied}
          onPress={onPublicKeyPress}
        />
        <KeyItem
          title="Private Key"
          text={privateKeyText}
          shortKey={shortPrivateKey}
          keyCopied={privateKeyCopied}
          onPress={onPrivateKeyPress}
        />
        {privateKeyCopied && publicKeyCopied && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onContinuePress}
            disabled={!privateKeyCopied || !publicKeyCopied}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default GenerateKeys;
