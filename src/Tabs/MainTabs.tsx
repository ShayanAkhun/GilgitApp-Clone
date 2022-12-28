import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import { FirstScreen } from '../screens/FirstScreen/FirstScreen'
import ModalScreen from '../screens/FirstModal/FirstModal'
import ItemsDashboard from '../screens/ItemsDashboard/ItemsDashboard';
import MessagesScreen from '../screens/Messages/Messages';
export const MainTabs = () => {
    const Home = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Icon name="home" size={24} />
            </View>
        );
    }

    const Messages = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Message!</Text>
                <MIcon size={24} name="android-messages" />
            </View>
        );
    }

    const Notifications = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Notifications!</Text>
                <Icon size={24} name='bell' />
            </View>
        );
    }
    const Account = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Account!</Text>
                <Icon name="user" color={24} />
            </View>
        );
    }



    const MyTabs = () => {
        return (
            <Tab.Navigator
                initialRouteName="Feed"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#4285F4',
                }}
            >
                <Tab.Screen
                    name="FirstScreen"
                    component={FirstScreen}
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
                        headerTitle: 'Messages',
                        headerShown: true,
                        tabBarLabel: 'Messages',
                        tabBarIcon: ({ color, size }) => (
                            <MIcon name="android-messages" color={color} size={size} />
                        ),

                    }}
                />
                <Tab.Screen
                    name="Add Items"
                    component={ItemsDashboard}
                    options={{
                        // tabBarLabel: 'DashboardItems',
                        tabBarIcon: ({ color, size }) => (
                            <SIcon name="plus" color={color} size={36} />
                        ),

                    }}
                />
                <Tab.Screen
                    name="Notifications"
                    component={ItemsDashboard}
                    options={{
                        tabBarLabel: 'Notifications',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="bell" color={color} size={size} />
                        ),

                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={Account}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="user" color={color} size={size} />
                        ),

                    }}
                />
            </Tab.Navigator>
        );
    }
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>

    );
}