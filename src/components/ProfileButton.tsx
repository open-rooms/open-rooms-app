import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../utils/types';
import ProfilePic from './ProfilePic';



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
      <ProfilePic
        style={{
          width: 30,
          height: 30,
          marginLeft: 12,
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;
