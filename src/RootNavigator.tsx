import 'text-encoding-polyfill';
import React, {useEffect, useState} from 'react';
import {StatusBar, ViewStyle} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStorage} from './utils/useStorage';

import Welcome from './screens/Welcome';
import Eula from './screens/Eula';
import Register from './screens/Register';
import Login from './screens/Login';
import Rooms from './screens/Rooms';
import Room from './screens/Room';
import Profile from './screens/Profile';
import {WithSplashScreen} from './screens/splash/SplashScreen';
import BackButton from './components/BackButton';
import ProfileButton from './components/ProfileButton';

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

  type HeaderStyleProps = ViewStyle & {
    backgroundColor?: string;
  };

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Stack.Navigator
        initialRouteName={accountConnected ? 'Rooms' : 'Welcome'}
        screenOptions={{
          headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
            borderBottomColor: 'transparent',
            shadowOpacity: 0,
            elevation: 0,
          } as HeaderStyleProps,

          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Eula"
          component={Eula}
          options={{
            title: 'End User License Agreement',
            headerLeft: BackButton,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Create Account',
            headerLeft: BackButton,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerLeft: BackButton,
          }}
        />
        <Stack.Screen
          name="Rooms"
          component={Rooms}
          options={{
            title: 'Rooms',
            // headerRight: () => <ProfileButton />,
            headerRight: ProfileButton,
          }}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{
            title: 'Room Details',
            headerLeft: BackButton,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerLeft: BackButton,
          }}
        />
      </Stack.Navigator>
    </WithSplashScreen>
  );
}

export default RootNavigator;