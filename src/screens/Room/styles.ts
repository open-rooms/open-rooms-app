import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenTitle: {
    top: 24,
    marginLeft: 24,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 14,
    color: SECONDARY_COLOR,
  },
  usernameText: {
    top: 12,
    marginLeft: 26,
    fontSize: 14,
    color: '#666',
  },
  contentContainer: {
    justifyContent: 'center',
    padding: 12,
  },
});
