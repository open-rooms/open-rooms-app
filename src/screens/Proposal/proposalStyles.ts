// proposalStyles.ts
import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR} from '../../utils/colors';

const proposalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 12,
  },
  proposalInfo: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginBottom: 8,
  },
  voteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voteUpButton: {
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '48%',
  },
  voteDownButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '48%',
  },
  voteButtonText: {
    fontSize: 14,
    color: 'white',
  },
  profilePictureContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
});

export default proposalStyles;
