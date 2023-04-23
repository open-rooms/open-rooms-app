import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  // Welcome Screen & Eula Screen
  content: {
    justifyContent: 'center',
    flex: 1,
    padding: 12,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: SECONDARY_COLOR,
  },
  text: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 24,
    marginRight: 24,
  },

  // Create Account Screen

  titleInput: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 24,
    textAlign: 'left',
  },
  textInput: {
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
    // flex: 1, // Add this line
  },
  keys: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 24,
    marginRight: 24,
  },
  copyIcon: {
    fontSize: 20,
    color: PRIMARY_COLOR,
  },

  usernameContainer: {
    flexDirection: 'row',
    //   alignItems: 'center',
  },
  usernameTextInput: {
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
    flex: 1, // Add this line
  },
  usernameValidIcon: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    position: 'absolute',
    right: 32,
    top: 8, // Add this line
    bottom: 0, // Add this line
    textAlignVertical: 'center', // Add this line
  },
  usernameWarningIcon: {
    fontSize: 20,
    color: 'red',
    position: 'absolute',
    right: 32,
    top: 8, // Add this line
    bottom: 0, // Add this line
    textAlignVertical: 'center', // Add this line
  },

  //

  screenProfileContent: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: SECONDARY_COLOR,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 24,
  },

  textRooms: {
    fontSize: 14,
    color: SECONDARY_COLOR,
    marginTop: 8,
    marginBottom: 8,
    //  marginLeft: 24,
    // marginRight: 24,
    textAlign: 'left',
  },

  button: {
    marginTop: 12,
    width: 144,
    height: 36,
    alignSelf: 'center',
  },
  buttonsContainer: {
    bottom: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },

  headerTitle: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    // paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 5,
  },
  modal: {
    flex: 1,
    //  backgroundColor: '#666',
    marginHorizontal: 10,
    marginTop: 144,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //  overflow: 'hidden',
  },
  robot: {
    width: 40,
    height: 40,
    borderRadius: 0,
    marginRight: 0,
  },
  textContainer: {
    flex: 1,
  },
  robotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  robotImageContainer: {
    //  backgroundColor: '#eee',
    // borderRadius: 50,
    overflow: 'hidden',
    marginRight: 12,
  },
  robotImage: {
    width: 10,
    height: 10,
  },
  robotDetailsContainer: {},
  robotName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  robotUsername: {
    fontSize: 16,
    color: PRIMARY_COLOR,
  },
  createRoomButtonContainer: {
    marginTop: 12,
    width: 144,
    height: 36,
    alignSelf: 'center',
    bottom: 20,
    position: 'absolute',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  creatorContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  creator: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  keyField: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  keyText: {
    color: 'grey',
    marginRight: 10,
    fontSize: 18,
  },
});
