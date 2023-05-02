import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: SECONDARY_COLOR,
  },
  roomsListContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
  },
  roomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  roomProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomPictureContainer: {
    width: 40,
    height: 40,
    borderRadius: 0,
    marginRight: 0,
  },
  roomTextContainer: {
    marginLeft: 10,
  },
  roomName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  roomUsername: {
    fontSize: 14,
    color: '#666',
  },
  roomAboutContainer: {
    marginTop: 10,
  },
  roomAbout: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
  roomMembers: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
  createRoomButtonContainer: {
    marginTop: 12,
    width: 144,
    height: 36,
    alignSelf: 'center',
    bottom: 20,
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 144,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonContainer: {
    bottom: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
});
