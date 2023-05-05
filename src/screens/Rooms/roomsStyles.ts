import {StyleSheet} from 'react-native';
import colorPalette from '../../utils/colorPalette';

export const roomsStyles = StyleSheet.create({
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.INPUT_BACKGROUND_COLOR,
  },
  itemProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPicture: {
    width: 40,
    height: 40,
    borderRadius: 0,
    marginRight: 0,
  },
  itemText: {
    marginLeft: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  itemUsername: {
    fontSize: 14,
    color: colorPalette.TEXT_COLOR_LIGHT,
  },
  itemAbout: {
    marginTop: 10,
  },
  itemDescription: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
  itemMembers: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
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
    //  alignSelf: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    color: colorPalette.BACKGROUND_COLOR,
  },
  modalContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 144,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
