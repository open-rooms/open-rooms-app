import {StyleSheet} from 'react-native';
import colorPalette from '../../utils/colorPalette';

export const generateKeysStyle = StyleSheet.create({
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
  textGroup: {
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: colorPalette.TEXT_COLOR,
    marginBottom: 8,
  },
  copyIcon: {
    fontSize: 20,
    color: colorPalette.PRIMARY_COLOR,
  },
  doneIcon: {
    fontSize: 20,
    color: colorPalette.SUCCESS_COLOR,
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
  keys: {
    color: colorPalette.PRIMARY_COLOR,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 12,
  },
});

export default generateKeysStyle;
