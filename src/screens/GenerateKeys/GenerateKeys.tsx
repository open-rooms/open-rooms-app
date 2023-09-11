import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {generateKeysStyle as styles} from './generateKeysStyle';
import {generateKeys} from '../../nostr/utils/generateKeys';
import {copyToClipboard} from '../../utils/copyToClipboard';
import {shortenKeys} from '../../utils/shortenKeys';
import {publicKeyText, privateKeyText} from '../../texts/registerText';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../utils/types';

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

  const [prvKey, setPrvKey] = React.useState('');
  const [pubKey, setPubKey] = React.useState('');
  const [privateKeyCopied, setPrivateKeyCopied] = React.useState(false);
  const [publicKeyCopied, setPublicKeyCopied] = React.useState(false);
  const accountPrivateKey = `nsec1${prvKey}`;
  const accountPublicKey = `npub1${pubKey}`;
  const shortPrivateKey = shortenKeys(accountPrivateKey, 40);
  const shortPublicKey = shortenKeys(accountPublicKey, 40);
  const publicKeyTitle = 'Public Key';
  const privateKeyTitle = 'Private Key';

  React.useEffect(() => {
    const {publicKey, privateKey} = generateKeys();
    setPrvKey(privateKey);
    setPubKey(publicKey);
  }, []);

  const onPublickKeyPress = () => {
    copyToClipboard(accountPublicKey);
    setPublicKeyCopied(true);
  };

  const onPrivateKeyPress = () => {
    copyToClipboard(accountPrivateKey);
    setPrivateKeyCopied(true);
  };

  const onContinuePress = () => {
    if (privateKeyCopied && publicKeyCopied) {
      console.log('Passing Private Key:', prvKey); // Add this log
      navigation.navigate('CreateAccount', {
        prvKey,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        {publicKeyCopied ? (
          <>
            <KeyItem
              title={publicKeyTitle}
              text={publicKeyText}
              shortKey={shortPublicKey}
              keyCopied={publicKeyCopied}
              onPress={onPublickKeyPress}
            />
            <KeyItem
              title={privateKeyTitle}
              text={privateKeyText}
              shortKey={shortPrivateKey}
              keyCopied={privateKeyCopied}
              onPress={onPrivateKeyPress}
            />
          </>
        ) : (
          <KeyItem
            title={publicKeyTitle}
            text={publicKeyText}
            shortKey={shortPublicKey}
            keyCopied={publicKeyCopied}
            onPress={onPublickKeyPress}
          />
        )}
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
