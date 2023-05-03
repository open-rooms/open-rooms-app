import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR} from '../../utils/colors';

const editProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 12,
  },
  label: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EBEEF0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: SECONDARY_COLOR,
    marginBottom: 20,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

export default editProfileStyles;
