import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {eulaStyles as styles} from './eulaStyles';
import {eulaText} from '../../texts/eulaText';

export function Eula({route}: any) {
  const navigation = useNavigation<any>();
  const [showHeaderTitle, setShowHeaderTitle] = React.useState(false);
  const eulaTitle = 'EULA';
  // const eulaPlaceholderText = 'EULA placeholder text';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: showHeaderTitle ? <Text>{eulaTitle}</Text> : '',
    });
  }, [navigation, showHeaderTitle]);

  const handleScroll = ({nativeEvent}: any) => {
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  const handleAccept = () => {
    const {screen} = route.params;
    navigation.navigate(screen);
  };

  const handleReject = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{eulaTitle}</Text>
          <Text style={styles.text}>{eulaText}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleAccept}>
            <Text style={styles.primaryButtonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleReject}>
            <Text style={styles.secondaryButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Eula;
