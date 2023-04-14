// App.tsx is the entry point of the app
import 'text-encoding-polyfill';
import 'react-native-url-polyfill/auto';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {StorageContextProvider} from './src/utils/useStorage';
import RootNavigator from './src/RootNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {persistStore} from 'redux-persist';
import {store} from './src/redux';

const persistor = persistStore(store);

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StorageContextProvider>
          <PaperProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </PaperProvider>
        </StorageContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
