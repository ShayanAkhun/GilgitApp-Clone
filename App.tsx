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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FirstScreen } from './src/screens/FirstScreen/FirstScreen';
import ItemsDashboard from './src/screens/ItemsDashboard/ItemsDashboard';
import MessagesScreen from './src/screens/Messages/Messages';
import { UploadItems } from './src/screens/UploadItem/UploadItem';
import { CategorySlider } from './src/screens/CategorySliderScreen/CategorySlider';
import { HeaderButton } from './src/components/Common/goBackIcon';
import BrScreen from './src/screens/CategorySliderScreen/BrScreen';
import BikesScreen from './src/screens/CategorySliderScreen/BikesScreen';
import CarsScreen from './src/screens/CategorySliderScreen/CarsScreen';
import LaptopsScreen from './src/screens/CategorySliderScreen/LaptopsScreen';


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
          <Stack.Screen options={{ headerShown: true, headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="CategorySlider" component={CategorySlider} />
          <Stack.Screen options={{ headerShown: false }} name="BrScreen" component={BrScreen} />
          <Stack.Screen options={{ headerShown: false }} name="BikesScreen" component={BikesScreen} />
          <Stack.Screen options={{ headerShown: false }} name="BikesScreen" component={CarsScreen} />
          <Stack.Screen options={{ headerShown: false }} name="LaptopsScreen" component={LaptopsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
};



export default App;
