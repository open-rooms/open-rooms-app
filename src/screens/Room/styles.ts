import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR} from '../../utils/colors';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEEF0',
  },
  profilePictureContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  roomPictureContainer: {
    width: 48,
    height: 48,
    borderRadius: 32,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14171A',
    marginBottom: 5,
  },
  usernameText: {
    fontSize: 14,
    color: '#657786',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#657786',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
  membersText: {
    fontSize: 14,
    color: SECONDARY_COLOR,
  },
  proposalsList: {
    marginTop: 20,
  },
  rowContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEEF0',
  },
  proposalTextContainer: {
    marginLeft: 10,
  },
  porposalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proposalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
    marginBottom: 5,
  },
  proposalDetails: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default styles;
