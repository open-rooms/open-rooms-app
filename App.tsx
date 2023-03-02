// App.tsx is the entry point of the app
import "text-encoding-polyfill";
import React from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StorageContextProvider } from "./utils/useStorage";

import Welcome from "./screens/Welcome";
import Eula from "./screens/Eula";
import Register from "./screens/Register";
import Login from "./screens/Login";
import PublishEvent from "./screens/PublishEvent";
import Feed from "./screens/Feed";

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
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PublishEvent" component={PublishEvent} />
            <Stack.Screen name="Feed" component={Feed} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StorageContextProvider>
  );
}

export default App;
