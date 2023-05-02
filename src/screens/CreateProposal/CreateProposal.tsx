import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button} from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {PRIMARY_COLOR} from '../../utils/colors';
import {styles} from './styles';

interface CreateProposalProps {
  onClose: () => void;
}

const CreateProposal: React.FC<CreateProposalProps> = ({onClose}) => {
  const [title, setTitle] = useState('');

  // Add any other required fields and their corresponding states

  const onCreateProposalPress = async () => {
    // Implement the logic for creating a proposal

    // Close the modal after the proposal is created
    onClose();
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" style={styles.closeModalIcon} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Create Proposal</Text>
        <Text style={styles.fieldTitle}>Proposal Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="My Proposal"
          onChangeText={text => setTitle(text)}
          value={title}
        />
        {/* Add any other required input fields */}
      </View>
      <Button
        title="Create Proposal"
        onPress={onCreateProposalPress}
        buttonColor={PRIMARY_COLOR}
        titleColor={'white'}
        buttonStyle={styles.createProposalButtonContainer}
      />
    </View>
  );
};

export default CreateProposal;
