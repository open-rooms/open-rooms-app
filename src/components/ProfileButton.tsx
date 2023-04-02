import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';

import {useNavigation, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../utils/types';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'Profile'
> & {
  params: {
    /* define your parameter types here */
  };
};

export const ProfileButton = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleProfilePress = () => {
    navigation.navigate('Profile', undefined);
  };

  return (
    <TouchableOpacity onPress={handleProfilePress}>
      <Text style={styles.title}>Profile</Text>
    </TouchableOpacity>
  );
};

export default ProfileButton;
