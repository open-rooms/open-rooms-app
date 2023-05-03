import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useStorage} from '../../utils/useStorage';
import {Button} from '../../components/Button';
import {PRIMARY_COLOR} from '../../utils/colors';
import styles from './styles';

export function Profile({route, navigation}: any) {
  const {publicKey, privateKey, disconnectAccount} = useStorage();

  // Add state variables for the profile information
  const [profilePicUrl, setProfilePicUrl] = useState(
    'https://example.com/path/to/profile-pic.jpg',
  );
  const [username, setUsername] = useState('John Doe');
  const [damus, setDamus] = useState('Some damus information');

  // Create a function to navigate to the EditProfile screen
  const handleEditProfile = () => {
    navigation.navigate('EditProfile', {
      profilePicUrl,
      username,
      damus,
    });
  };

  // Add useEffect to subscribe to 'focus' event
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Read the updated profile data from the route params
      const updatedProfile = route.params?.updatedProfile;

      if (updatedProfile) {
        setProfilePicUrl(updatedProfile.profilePicUrl);
        setUsername(updatedProfile.username);
        setDamus(updatedProfile.damus);
      }
    });

    return unsubscribe;
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.screenTitle}>Profile</Text>
        <Text style={styles.text}>Public Key: {publicKey}</Text>
        <Text style={styles.text}>Private Key: {privateKey}</Text>
        <Image source={{uri: profilePicUrl}} style={styles.profileImage} />
        <Text style={styles.text}>Username: {username}</Text>
        <Text style={styles.text}>Damus: {damus}</Text>

        <Button
          title="Edit Profile"
          onPress={handleEditProfile}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.button}
        />
        <Button
          title="Logout"
          onPress={disconnectAccount}
          buttonColor={PRIMARY_COLOR}
          titleColor={'white'}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
}

export default Profile;
