// ProposalStatus.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import colorPallete from '../utils/colorPalette';

const ProposalStatus = ({status, timePassed}: any) => {
  const getStatusIndicatorColor = () => {
    switch (status) {
      case 'live':
        return colorPallete.SUCCESS_COLOR;
      case 'passed':
        return colorPallete.PRIMARY_COLOR;
      case 'rejected':
        return colorPallete.ERROR_COLOR;
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
