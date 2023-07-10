import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createProposalStyles as styles} from './createProposalStyles';
import {useDispatch} from 'react-redux';
import {addProposal} from '../../redux/proposals-slice';
import useNostr from '../../nostr/useNostr';

interface CreateProposalProps {
  onClose: () => void;
}

const CreateProposal: React.FC<CreateProposalProps> = ({onClose}) => {
  const [proposal, setProposal] = useState('');
  const maxLength = 280;
  const remainingChars = maxLength - proposal.length;
  const {publishProposal} = useNostr();
  const dispatch = useDispatch();

  const onCreateProposalPress = async () => {
    const newProposal = {
      id: Math.random().toString(), // Replace this with a unique ID
      proposal: proposal,
      start_date: Date.now(),
      duration: 0,
      status: 'New',
      room: '',
      creator: '',
    };

    // Create a new object for publishProposal with start_date and duration as strings
    const fieldsForPublish = {
      ...newProposal,
      start_date: newProposal.start_date.toString(),
      duration: newProposal.duration.toString(),
    };

    const kind = 1;
    const tags: string[][] = []; // specify the tags

    try {
      // Use fieldsForPublish for the publishProposal call
      await publishProposal(kind, fieldsForPublish, tags);
      // Use newProposal for the addProposal action
      dispatch(addProposal(newProposal));
    } catch (error) {
      console.error('Failed to create proposal:', error);
    }
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
