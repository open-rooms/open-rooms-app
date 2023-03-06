// App.tsx is the entry point of the app
import 'text-encoding-polyfill';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStorage} from './utils/useStorage';

import Welcome from './screens/Welcome';
import Eula from './screens/Eula';
import Register from './screens/Register';
import Login from './screens/Login';
import PublishEvent from './screens/PublishEvent';
import Feed from './screens/Feed';
import CreateRoom from './screens/CreateRoom';
import {WithSplashScreen} from './screens/splash/SplashScreen';

export function RootNavigator() {
  const Stack = createNativeStackNavigator();
  const {accountConnected} = useStorage();

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 1800);
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle(accountConnected ? 'dark-content' : 'light-content');
  }, [accountConnected]);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Stack.Navigator initialRouteName={accountConnected ? 'Feed' : 'Welcome'}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Eula" component={Eula} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PublishEvent" component={PublishEvent} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
      </Stack.Navigator>
    </WithSplashScreen>
  );
}

export default RootNavigator;
