import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import proposalStyles from './proposalStyles';
import ProfilePic from '../../components/ProfilePic';
import ProposalStatus from '../../components/ProposalStatus';
import {getTimePassed} from '../../utils/time';

export function Proposal({route}: any) {
  const {proposal} = route.params;
  const timePassed = getTimePassed(proposal.start_date);

  const renderVotingButtons = () => {
    if (proposal.status === 'live') {
      return (
        <View style={proposalStyles.voteButtons}>
          <TouchableOpacity
            style={proposalStyles.voteUpButton}
            onPress={() => {}}>
            <Text style={proposalStyles.voteButtonText}>Vote Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={proposalStyles.voteDownButton}
            onPress={() => {}}>
            <Text style={proposalStyles.voteButtonText}>Vote Down</Text>
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
    <View style={proposalStyles.container}>
      <ProfilePic style={proposalStyles.profilePictureContainer} />
      <Text style={proposalStyles.infoLabel}>{proposal.creator}</Text>
      <Text style={proposalStyles.infoLabel}>{proposal.proposal}</Text>
      <Text style={proposalStyles.infoLabel}>Room: {proposal.room}</Text>
      <ProposalStatus status={proposal.status} timePassed={timePassed} />

      {renderVotingButtons()}
    </View>
  );
}

export default Proposal;
