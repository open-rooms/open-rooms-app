//BackButton.tsx
import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import colorPallete from '../utils/colorPalette';

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
        color={colorPallete.PRIMARY_COLOR}
        marginLeft={12}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
