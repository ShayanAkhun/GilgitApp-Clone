import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import mIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import ItemsDashboard from '../screens/ItemsDashboard/ItemsDashboard';
import MessagesScreen from '../screens/Messages/Messages';
import { SignUpform, } from '../screens/SignUpForm/SignupForm';
import { UploadItems } from '../screens/UploadItem/LaptopsUploadForm';
import { HeaderButton } from '../components/Common/goBackIcon';
import Notifications from '../screens/NotificationsScreen/Notifications';
import ItemUploadBottomSheet from '../components/UploadItemBottomSheet/ItemUploadBottomSheet';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="ItemsDashboard"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4285F4',
                tabBarStyle: { position: 'absolute' },
                headerLeft: () => (<HeaderButton />)
            }}>
            <Tab.Screen
                name="ItemDashboard"
                component={ItemsDashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),

                }}
            />
            <Tab.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Messages',
                    headerShown: true,
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color, size }) => (
                        <MIcon name="android-messages" color={color} size={size} />
                    ),

                }}
            />
            <Tab.Screen
                name="Items"
                component={ItemUploadBottomSheet}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Upload Items',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <SIcon name="plus" color={color} size={36} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="bell" color={color} size={size} />
                    ),

                }}
            />
            <Tab.Screen
                name="Account"
                component={SignUpform}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    ),

                }}
            />
        </Tab.Navigator>
    )
}