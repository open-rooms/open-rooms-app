import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {PRIMARY_COLOR} from '../utils/colors';

export const BackButton = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBackPress}>
      <MaterialIcons
        name="arrow-back"
        size={22}
        color={PRIMARY_COLOR}
        marginLeft={12}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
