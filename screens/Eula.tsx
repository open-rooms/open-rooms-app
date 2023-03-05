import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../components/Button';
import {BackButton} from '../components/BackButton';
import {styles} from './styles';
import {PRIMARY_COLOR} from '../utils/colors';
import {eulaText} from '../texts/eulaText';

export function Eula({route}: any) {
  const navigation = useNavigation<any>();
  const [showHeaderTitle, setShowHeaderTitle] = React.useState(false);

  const eulaTitle = 'EULA';

  const handleScroll = ({nativeEvent}: any) => {
    setShowHeaderTitle(nativeEvent.contentOffset.y > 0);
  };

  const handleAccept = () => {
    const {screen} = route.params;
    navigation.navigate(screen);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
      headerTitle: showHeaderTitle ? <Text>{eulaTitle}</Text> : '',
      headerTitleStyle: {
        color: showHeaderTitle ? PRIMARY_COLOR : '',
      },
    });
  }, [navigation, showHeaderTitle]);

  return (
    <View style={styles.container}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={styles.content}>
          <Text style={styles.title}>{eulaTitle}</Text>
          <Text style={styles.text}>{eulaText}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Accept"
            onPress={handleAccept}
            buttonColor={PRIMARY_COLOR}
            titleColor={'white'}
            buttonStyle={styles.button}
          />
          <Button
            title="Reject"
            onPress={() => navigation.navigate('Welcome')}
            titleColor={PRIMARY_COLOR}
            buttonColor={'white'}
            buttonStyle={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Eula;
