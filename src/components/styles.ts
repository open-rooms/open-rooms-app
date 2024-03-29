import {StyleSheet} from 'react-native';
import colorPalette from '../utils/colorPalette';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colorPalette.PRIMARY_COLOR,
  },
  title: {
    fontSize: 14,
  },
  containerProfile: {
    overflow: 'hidden',
  },
  proposalStatusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  proposalStatus: {
    fontSize: 14,
    color: colorPalette.SECONDARY_COLOR,
    marginBottom: 4,
  },
  proposalStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
