// App.tsx is the entry point of the app
import 'text-encoding-polyfill';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StorageContextProvider, useStorage} from './utils/useStorage';

import Welcome from './screens/Welcome';
import Eula from './screens/Eula';
import Register from './screens/Register';
import Login from './screens/Login';
import PublishEvent from './screens/PublishEvent';
import Feed from './screens/Feed';
import CreateRoom from './screens/CreateRoom';

export function App() {
  const Stack = createNativeStackNavigator();
  const {accountConnected} = useStorage();
  console.log('account connected', accountConnected);

  useEffect(() => {
    StatusBar.setBarStyle(accountConnected ? 'dark-content' : 'light-content');
  }, [accountConnected]);

  return (
    <StorageContextProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={accountConnected ? 'Feed' : 'Welcome'}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Eula" component={Eula} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PublishEvent" component={PublishEvent} />
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="CreateRoom" component={CreateRoom} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StorageContextProvider>
  );
}

export default App;
