import {Alert} from 'react-native';
import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await Clipboard.setStringAsync(text);
    Alert.alert('Success', `${text} copied to clipboard!`);
    return true;
  } catch (error) {
    Alert.alert('Error', `Error copying ${text} to clipboard`);
    return false;
  }
};

export default copyToClipboard;
