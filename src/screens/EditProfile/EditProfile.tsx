import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ProfilePic from '../../components/ProfilePic';
import {editProfileStyles as styles} from './editProfileStyles';

function EditProfile({route}: any) {
  const {profilePicUrl, username, damus, onSave} = route.params;
  const navigation = useNavigation();

  const [updatedProfilePicUrl, setUpdatedProfilePicUrl] =
    useState(profilePicUrl);
  const [updatedUsername, setUpdatedUsername] = useState(username);
  const [updatedDamus, setUpdatedDamus] = useState(damus);

  const handleSaveProfile = () => {
    onSave({
      profilePicUrl: updatedProfilePicUrl,
      username: updatedUsername,
      damus: updatedDamus,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      {updatedProfilePicUrl ? (
        <Image
          source={{uri: updatedProfilePicUrl}}
          style={styles.profileImage}
        />
      ) : (
        <ProfilePic style={styles.profileImage} />
      )}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Profile Picture URL:</Text>
        <TextInput
          style={styles.input}
          value={updatedProfilePicUrl}
          onChangeText={setUpdatedProfilePicUrl}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={updatedUsername}
          onChangeText={setUpdatedUsername}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Damus:</Text>
        <TextInput
          style={styles.input}
          value={updatedDamus}
          onChangeText={setUpdatedDamus}
          multiline={true}
        />
      </View>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleSaveProfile}>
        <Text style={styles.primaryButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditProfile;
