// eulaStyles.ts
import {StyleSheet} from 'react-native';
import colorPalette from '../../utils/colorPalette';

export const eulaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.BACKGROUND_COLOR,
    paddingHorizontal: 32,
    paddingTop: 12,
    paddingBottom: 40,
    justifyContent: 'space-between',
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
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: colorPalette.TEXT_COLOR,
    marginBottom: 8,
  },
  buttonsContainer: {
    marginBottom: 20,
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
  secondaryButton: {
    backgroundColor: colorPalette.ERROR_COLOR,
    borderWidth: 1,
    borderColor: colorPalette.ERROR_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: colorPalette.BACKGROUND_COLOR,
  },
});
