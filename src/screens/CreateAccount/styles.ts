import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenTitle: {
    top: 24,
    marginLeft: 28,
    marginBottom: 24,
    fontSize: 32,
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
  },
  inputTitle: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 34,
    textAlign: 'left',
  },
  usernameContainer: {
    flexDirection: 'row',
  },
  usernameInputText: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    color: SECONDARY_COLOR,
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
    height: 36,
    marginLeft: 36,
    marginRight: 36,
    marginBottom: 12,
    flex: 1, // Add this line
  },
  usernameWarningIcon: {
    fontSize: 20,
    color: 'red',
    position: 'absolute',
    right: 42,
    top: 8,
    textAlignVertical: 'center',
  },
  usernameValidIcon: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    position: 'absolute',
    right: 42,
    top: 8,
    textAlignVertical: 'center',
  },
  screenSubtitle: {
    fontSize: 24,
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 24,
  },
  screenText: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 36,
    marginRight: 36,
  },

  copyIcon: {
    fontSize: 20,
    color: PRIMARY_COLOR,
  },

  mainButton: {
    marginTop: 12,
    width: 144,
    height: 36,
    alignSelf: 'center',
  },

  keys: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 24,
    marginRight: 24,
  },
});
