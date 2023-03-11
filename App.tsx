// App.tsx is the entry point of the app
import 'text-encoding-polyfill';
import 'react-native-url-polyfill/auto';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {StorageContextProvider} from './src/utils/useStorage';
import RootNavigator from './src/RootNavigator';

export function App() {
  return (
    <StorageContextProvider>
      <PaperProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </StorageContextProvider>
  );
}

export default App;
