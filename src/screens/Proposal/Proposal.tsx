import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ProfilePic from '../../components/ProfilePic';
import ProposalStatus from '../../components/ProposalStatus';
import {getTimePassed} from '../../utils/time';
import {proposalStyles as styles} from './proposalStyles';

export function Proposal({route}: any) {
  const {proposal} = route.params;
  const timePassed = getTimePassed(proposal.start_date);

  const renderVotingButtons = () => {
    if (proposal.status === 'live') {
      return (
        <View style={styles.voteButtons}>
          <TouchableOpacity style={styles.voteUpButton} onPress={() => {}}>
            <Text style={styles.voteButtonText}>Vote Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.voteDownButton} onPress={() => {}}>
            <Text style={styles.voteButtonText}>Vote Down</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Votes for Yes: {proposal.votesYes}</Text>
          <Text>Votes for No: {proposal.votesNo}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{proposal.room}</Text>
      <ProfilePic style={styles.profileImage} />
      <Text style={styles.label}>{proposal.creator}</Text>
      <Text style={styles.label}>{proposal.proposal}</Text>
      <ProposalStatus status={proposal.status} timePassed={timePassed} />

      {renderVotingButtons()}
    </View>
  );
}

export default Proposal;
