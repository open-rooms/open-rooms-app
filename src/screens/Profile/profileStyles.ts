import {StyleSheet} from 'react-native';
import colorPalette from '../../utils/colorPalette';

export const profileStyles = StyleSheet.create({
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
  profileImage: {
    width: 60,
    height: 60,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    marginBottom: 8,
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
    backgroundColor: colorPalette.BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: colorPalette.PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: colorPalette.PRIMARY_COLOR,
  },
  deleteButton: {
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
  deleteButtonText: {
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

export default profileStyles;
