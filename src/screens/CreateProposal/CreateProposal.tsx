import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createProposalStyles as styles} from './createProposalStyles';
import {useDispatch} from 'react-redux';
import {addProposal} from '../../redux/proposals-slice';
import {PROPOSAL_TAG} from '../../nostr-tools/nostrTags';
import {useStorage} from '../../storage/useStorage';
import publishEvent from '../../nostr-tools/publishEvent';

const CreateProposal = (props: { onClose: () => void }) => {
  const [proposal, setProposal] = useState('');
  const maxLength = 280;
  const remainingChars = maxLength - proposal.length;
  const dispatch = useDispatch();
  const { privateKey } = useStorage(); 

  const onCreateProposalPress = async () => {
    const newProposal = {
      id: Math.random().toString(),
      proposal: proposal,
      start_date: Date.now(),
      duration: 0,
      status: 'New',
      room: '',
      creator: {
        id: '',
        pubKey: '',
        profilePicUrl: '',
        username: '',
        damus: '',
      },
    };

    const kind = 1;
    const fileds = {
      ...newProposal,
      duration: newProposal.duration.toString(),
    };
    const tags: string[][] = [PROPOSAL_TAG]; // specify the tags

    try {
      await publishEvent(kind, fileds, tags, privateKey);
      dispatch(addProposal(newProposal));
    } catch (error) {
      console.error('Failed to create proposal:', error);
    }
    props.onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onClose}>
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
