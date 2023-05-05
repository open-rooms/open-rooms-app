import {StyleSheet} from 'react-native';
import colorPalette from '../../utils/colorPalette';

export const createProposalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.BACKGROUND_COLOR,
    paddingHorizontal: 32,
    paddingTop: 12,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    color: colorPalette.TEXT_COLOR,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 24,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
  },

  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    marginBottom: 8,
  },
  usernameContainer: {
    flexDirection: 'row',
  },
  usernameInput: {
    paddingLeft: 14,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colorPalette.INPUT_BACKGROUND_COLOR,
    backgroundColor: colorPalette.INPUT_BACKGROUND_COLOR,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    height: 120,
  },
  primaryButton: {
    backgroundColor: colorPalette.PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: colorPalette.PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    fontSize: 14,
    color: colorPalette.BACKGROUND_COLOR,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginRight: 24,
    marginBottom: 16,
    fontSize: 24,
    color: colorPalette.PRIMARY_COLOR,
  },
  errorIcon: {
    fontSize: 20,
    color: colorPalette.ERROR_COLOR,
    position: 'absolute',
    right: 12,
    top: 12,
    textAlignVertical: 'center',
  },
  doneIcon: {
    fontSize: 20,
    color: colorPalette.SUCCESS_COLOR,
    position: 'absolute',
    right: 12,
    top: 12,
    textAlignVertical: 'center',
  },
  reminingChars: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    top: 12,
  },
});
