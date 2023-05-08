import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useStorage} from '../../utils/useStorage';
import {profileStyles as styles} from './profileStyles';
import {shortenKeys} from '../../utils/shortenKeys';
import ProfilePic from '../../components/ProfilePic';
import copyToClipboard from '../../utils/copyToClipboard';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/user-slice';

export function Profile({route, navigation}: any) {
  const {publicKey} = useStorage();

  // Add state variables for the profile information
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [username, setUsername] = useState('John Doe');
  const [damus, setDamus] = useState('Some damus information');
  const pubKey = shortenKeys(publicKey, 20);
  const dispatch = useDispatch();

  // Create a function to navigate to the EditProfile screen
  const handleEditProfile = () => {
    navigation.navigate('EditProfile', {
      profilePicUrl,
      username,
      damus,
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDeleteAccount = () => {
    // TODO: Delete account
    navigation.navigate('Welcome');
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

  const handleCopyPubKey = async () => {
    await copyToClipboard(publicKey);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {profilePicUrl ? (
        <Image source={{uri: profilePicUrl}} style={styles.profileImage} />
      ) : (
        <ProfilePic style={styles.profileImage} />
      )}
      <TouchableOpacity onPress={handleCopyPubKey}>
        <Text style={styles.keys}>{pubKey}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Username: {username}</Text>
      <Text style={styles.label}>Damus: {damus}</Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleEditProfile}>
        <Text style={styles.primaryButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
        <Text style={styles.secondaryButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;
