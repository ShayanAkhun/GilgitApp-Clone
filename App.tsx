/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { type PropsWithChildren } from 'react';
import { MainTabs } from './src/Tabs/MainTabs';
import { NativeBaseProvider } from 'native-base';
import { SheetProvider } from "react-native-actions-sheet";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FirstScreen } from './src/screens/FirstScreen/FirstScreen';
import ItemsDashboard from './src/screens/ItemsDashboard/ItemsDashboard';
import MessagesScreen from './src/screens/Messages/Messages';
import { UploadItems } from './src/screens/UploadItem/UploadItem';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen options={{ headerShown: false }} name="FirstScreen" component={FirstScreen} />
          <Stack.Screen options={{ headerShown: false }} name="MainTabs" component={MainTabs} />
          <Stack.Screen options={{ headerShown: false }} name="ItemsDashboard" component={ItemsDashboard} />
          <Stack.Screen options={{ headerShown: false }} name="MessagesScreen" component={MessagesScreen} />
          <Stack.Screen options={{ headerShown: false }} name="UploadItems" component={UploadItems} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
};



export default App;
