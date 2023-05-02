import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR} from '../../utils/colors';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  roomContainer: {
    paddingHorizontal: 32,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEEF0',
  },
  roomPictureContainer: {
    width: 48,
    height: 48,
    borderRadius: 32,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  roomNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
    marginBottom: 4,
  },
  roomUsername: {
    marginLeft: 4,
    marginRight: 8,
    fontSize: 14,
    color: SECONDARY_COLOR,
  },
  roomAbout: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
  roomMembers: {
    fontSize: 14,
    color: SECONDARY_COLOR,
  },
  proposalsListContainer: {
    marginTop: 18,
  },
  proposalContainer: {
    paddingHorizontal: 32,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEEF0',
  },
  profilePictureContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  porposalProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proposalTextContainer: {
    marginLeft: 12,
    flex: 1, // Added this to make the container use the remaining space
  },
  proposalCreator: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 4,
  },
  proposalTitleContainer: {
    flex: 1, // Added this to make the container use the remaining space
  },
  proposalTitle: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginBottom: 4,
    flexWrap: 'wrap', // Added this property to wrap text when it reaches the container edge
  },
  proposalStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  proposalStatusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  proposalStatus: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginBottom: 4,
  },
  createProposalButtonContainer: {
    marginTop: 12,
    width: 144,
    height: 36,
    alignSelf: 'center',
    bottom: 20,
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 144,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonContainer: {
    bottom: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default styles;
