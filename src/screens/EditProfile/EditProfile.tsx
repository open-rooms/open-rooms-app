import React, {useState} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Button} from '../../components/Button';
import {PRIMARY_COLOR} from '../../utils/colors';

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
      <Text style={styles.label}>Profile Picture URL:</Text>
      <TextInput
        style={styles.input}
        value={updatedProfilePicUrl}
        onChangeText={setUpdatedProfilePicUrl}
      />
      <Image
        source={{uri: updatedProfilePicUrl}}
        style={{width: 100, height: 100, borderRadius: 50, marginBottom: 20}}
      />
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={updatedUsername}
        onChangeText={setUpdatedUsername}
      />
      <Text style={styles.label}>Damus:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={updatedDamus}
        onChangeText={setUpdatedDamus}
        multiline={true}
      />
      <Button
        title="Save"
        onPress={handleSaveProfile}
        buttonColor={PRIMARY_COLOR}
        titleColor={'white'}
        buttonStyle={styles.updateButton}
      />
    </View>
  );
}

export default EditProfile;
