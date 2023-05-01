// Proposal.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';

export function Proposal({route}: any) {
  const {proposal} = route.params;

  return (
    <View>
      <Text>Proposal: {proposal.proposal}</Text>
      <Text>Creator: {proposal.creator}</Text>
      <Text>Status: {proposal.status}</Text>
      {/* Add more details if necessary */}

      <Button title="Vote Up" onPress={() => {}} />
      <Button title="Vote Down" onPress={() => {}} />
    </View>
  );
}

export default Proposal;
