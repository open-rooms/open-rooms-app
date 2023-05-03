// ProposalStatus.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {PRIMARY_COLOR} from '../utils/colors';

const ProposalStatus = ({status, timePassed}: any) => {
  const getStatusIndicatorColor = () => {
    switch (status) {
      case 'live':
        return 'green';
      case 'passed':
        return PRIMARY_COLOR;
      case 'rejected':
        return 'red';
      default:
        return 'transparent';
    }
  };

  return (
    <View style={styles.proposalStatusContainer}>
      <View
        style={[
          styles.proposalStatusIndicator,
          {backgroundColor: getStatusIndicatorColor()},
        ]}
      />
      <Text style={styles.proposalStatus}>
        {`${status} \u00B7 ${timePassed}`}
      </Text>
    </View>
  );
};

export default ProposalStatus;
