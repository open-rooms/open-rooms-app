import "text-encoding-polyfill";
import React from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StorageContextProvider } from "./utils/storage-context";

import Welcome from "./screens/Welcome";
import CreateAccount from "./screens/CreateAccount";
import Eula from "./screens/Eula";
import Keys from "./screens/Keys";

export function App() {
  const Stack = createNativeStackNavigator();

  return (
    <StorageContextProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar />
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Eula" component={Eula} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="Keys" component={Keys} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StorageContextProvider>
  );
}

export default App;
