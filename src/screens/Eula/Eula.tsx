import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../components/Button';
import {styles} from './styles';
import {PRIMARY_COLOR} from '../../utils/colors';
// import {eulaText} from '../../texts/eulaText';

export function Eula({route}: any) {
  const navigation = useNavigation<any>();
  const [showHeaderTitle, setShowHeaderTitle] = React.useState(false);
  const eulaTitle = 'EULA';
  const eulaPlaceholderText = 'EULA placeholder text';

  const handleScroll = ({nativeEvent}: any) => {
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  const handleAccept = () => {
    const {screen} = route.params;
    navigation.navigate(screen);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: showHeaderTitle ? <Text>{eulaTitle}</Text> : '',
    });
  }, [navigation, showHeaderTitle]);

  return (
    <View style={styles.screenContainer}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.contentContainer}>
          <Text style={styles.screenTitle}>{eulaTitle}</Text>
          <Text style={styles.eulaText}>{eulaPlaceholderText}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Accept"
            onPress={handleAccept}
            buttonColor={PRIMARY_COLOR}
            titleColor={'white'}
            buttonStyle={styles.buttonContainer}
          />
          <Button
            title="Reject"
            onPress={() => navigation.navigate('Welcome')}
            titleColor={PRIMARY_COLOR}
            buttonColor={'white'}
            buttonStyle={styles.buttonContainer}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Eula;
