import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTitle: {
    marginLeft: 24,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: SECONDARY_COLOR,
  },
  inputTitle: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 24,
    textAlign: 'left',
  },
  inputText: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    color: SECONDARY_COLOR,
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
    height: 36,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 12,
  },
  createRoomButtonContainer: {
    marginTop: 12,
    width: 144,
    height: 36,
    alignSelf: 'center',
    bottom: 48,
    position: 'absolute',
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginRight: 24,
    marginBottom: 16,
    fontSize: 24, // Adjust the icon size as needed
    color: PRIMARY_COLOR, // Adjust the icon color as needed
  },
});
