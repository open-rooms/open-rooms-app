import {StyleSheet} from 'react-native';
import colorPalette from '../../utils/colorPalette';

export const roomStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.BACKGROUND_COLOR,
    paddingHorizontal: 32,
    paddingTop: 12,
    paddingBottom: 40,
  },
  roomContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.INPUT_BORDER_COLOR,
  },
  roomHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomPicture: {
    width: 48,
    height: 48,
    borderRadius: 32,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  roomActionContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  roomNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colorPalette.SECONDARY_COLOR,
    marginBottom: 4,
  },
  roomUsername: {
    marginLeft: 4,
    marginRight: 8,
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
  },
  roomAbout: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
  roomMembers: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
  },
  proposalContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.INPUT_BORDER_COLOR,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  porposalProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proposalTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  proposalCreator: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 4,
  },
  proposalTitleContainer: {
    flex: 1,
  },
  proposalTitle: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  modalContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 144,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  primarySmallButton: {
    backgroundColor: colorPalette.PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: colorPalette.PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 14,
    color: colorPalette.BACKGROUND_COLOR,
  },
  secondarySmallButton: {
    backgroundColor: colorPalette.BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: colorPalette.PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    color: colorPalette.PRIMARY_COLOR,
  },
});

export default roomStyles;
