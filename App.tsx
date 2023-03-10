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
import { LaptopsUploadItems } from './src/screens/UploadItem/LaptopsUploadForm';
import { HeaderButton } from './src/components/Common/goBackIcon';
import BrScreen from './src/screens/CategorySliderScreen/BrScreen';
import BikesScreen from './src/screens/CategorySliderScreen/BikesScreen';
import CarsScreen from './src/screens/CategorySliderScreen/CarsScreen';
import { LaptopScreen } from './src/screens/CategorySliderScreen/LaptopScreen';
import Notifications from './src/screens/NotificationsScreen/Notifications';
import Favourite from './src/screens/NotificationsScreen/Favourtie';
import ItemUploadBottomSheet from './src/components/UploadItemBottomSheet/ItemUploadBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BuyerRequestUploadForm } from './src/screens/UploadItem/BuyerRequestUploadForm';
import { CarsUploadItems } from './src/screens/UploadItem/CarsUploadForm';
import { BikesUploadForm } from './src/screens/UploadItem/BIkesUpload';



const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="FirstScreen" component={FirstScreen} />
            <Stack.Screen options={{ headerShown: false }} name="MainTabs" component={MainTabs} />
            <Stack.Screen options={{ headerShown: false }} name="ItemsDashboard" component={ItemsDashboard} />
            <Stack.Screen options={{ headerShown: false }} name="MessagesScreen" component={MessagesScreen} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Laptops', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="LaptopsUploadItems" component={LaptopsUploadItems} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Laptops', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="LaptopScreen" component={LaptopScreen} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Buyer Requests', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="BrScreen" component={BrScreen} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Bikes', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="BikesScreen" component={BikesScreen} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Cars', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="CarsScreen" component={CarsScreen} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Notifications', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="Notifications" component={Notifications} />
            <Stack.Screen options={{ headerShown: false, headerTitle: 'Favourite', headerTitleAlign: 'center', }} name="Favourite" component={Favourite} />
            <Stack.Screen options={{ headerShown: false, headerTitle: 'Favourite', headerTitleAlign: 'center', }} name="ItemUploadBottomSheet" component={ItemUploadBottomSheet} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Buyer Request\s', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="BuyerRequestUploadForm" component={BuyerRequestUploadForm} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Cars/SUVs', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="CarsUploadItems" component={CarsUploadItems} />
            <Stack.Screen options={{ headerShown: true, headerTitle: 'Bikes', headerTitleAlign: 'center', headerLeft: () => (<HeaderButton />) }} name="BikesUploadForm" component={BikesUploadForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </NativeBaseProvider>

  );
};



export default App;
