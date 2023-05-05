import 'text-encoding-polyfill';
import React, {useEffect, useState} from 'react';
import {StatusBar, ViewStyle} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStorage} from './utils/useStorage';

import Welcome from './screens/Welcome/Welcome';
import Eula from './screens/Eula/Eula';
import GenerateKeys from './screens/GenerateKeys/GenerateKeys';
import CreateAccount from './screens/CreateAccount/CreateAccount';
import Login from './screens/Login/Login';
import Rooms from './screens/Rooms/Rooms';
import Room from './screens/Room/Room';
import Profile from './screens/Profile/Profile';
import {WithSplashScreen} from './screens/splash/SplashScreen';
import BackButton from './components/BackButton';
import ProfileButton from './components/ProfileButton';
import Proposal from './screens/Proposal/Proposal';
import EditRoom from './screens/EditRoom/EditRoom';
import EditProfile from './screens/EditProfile/EditProfile';
import {IRoom} from './utils/types';

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
        {accountConnected ? (
          <>
            <Stack.Screen
              name="Rooms"
              component={Rooms}
              options={{
                title: 'Rooms',
                headerRight: ProfileButton,
              }}
            />
            <Stack.Screen
              name="Room"
              component={Room}
              options={{
                title: '',
                headerLeft: BackButton,
              }}
            />
            <Stack.Screen
              name="EditRoom"
              options={{
                title: '',
                headerLeft: BackButton,
              }}
              children={props => {
                const {room, onUpdate} = props.route.params as {
                  room: IRoom;
                  onUpdate: (updatedRoom: IRoom) => void;
                };

                return (
                  <EditRoom
                    onDelete={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                    room={room}
                    onUpdate={onUpdate}
                    {...props}
                  />
                );
              }}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: '',
                headerLeft: BackButton,
              }}
            />
            <Stack.Screen
              name="Proposal"
              component={Proposal}
              options={{
                title: '',
                headerLeft: BackButton,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                title: 'Edit Profile',
                headerLeft: BackButton,
              }}
            />
          </>
        ) : (
          <>
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
              name="GenerateKeys"
              component={GenerateKeys}
              options={{
                title: '',
                headerLeft: BackButton,
              }}
            />

            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{
                title: '',
                headerLeft: BackButton,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: '',
                headerLeft: BackButton,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </WithSplashScreen>
  );
}

export default RootNavigator;
