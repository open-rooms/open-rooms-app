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
    color: '#657786',
  },
});

export default styles;
