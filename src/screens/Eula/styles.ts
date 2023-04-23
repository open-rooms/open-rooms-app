import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenTitle: {
    marginLeft: 24,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: SECONDARY_COLOR,
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 12,
  },
  eulaText: {
    marginLeft: 24,
    marginRight: 24,
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
  buttonsContainer: {
    bottom: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 12,
    width: 144,
    height: 36,
    alignSelf: 'center',
  },
});
