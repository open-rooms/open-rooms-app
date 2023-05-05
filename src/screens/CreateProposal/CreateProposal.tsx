import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {createProposalStyles as styles} from './createProposalStyles';

interface CreateProposalProps {
  onClose: () => void;
}

const CreateProposal: React.FC<CreateProposalProps> = ({onClose}) => {
  const [proposal, setProposal] = useState('');
  const maxLength = 280;
  const remainingChars = maxLength - proposal.length;
  const onCreateProposalPress = async () => {
    // Implement the logic for creating a proposal

    // Close the modal after the proposal is created
    onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose}>
        <Icon name="close" style={styles.closeIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Create Proposal</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Proposal description</Text>
        <TextInput
          style={styles.input}
          placeholder="My Proposal is about..."
          onChangeText={text => setProposal(text)}
          multiline // This allows the user to type on multiple lines
          maxLength={maxLength}
          value={proposal}
        />
        <Text style={styles.reminingChars}>
          {remainingChars} characters remaining
        </Text>
      </View>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onCreateProposalPress}>
        <Text style={styles.primaryButtonText}>Create Proposal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProposal;
