import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR, PRIMARY_COLOR} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 12,
  },
  list: {
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: SECONDARY_COLOR,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: SECONDARY_COLOR,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default styles;
