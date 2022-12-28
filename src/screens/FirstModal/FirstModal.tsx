import * as React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatButton } from '../../components';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';


function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, fontFamily: 'Poppins-Light', }}>This is the home screen!</Text>
            <Button
                onPress={() => navigation.navigate('MyModal')}
                title="Open Modal"
            />
        </View>
    );
}

function ModalScreen({ navigation }) {
    return (
        <View style={styles.ModalContainer}>
            <View style={styles.Icon}>
                <MIcon name="close" size={24} color="black" onPress={() => navigation.goBack()} />
            </View>
            <View>
                <Image source={require('../../assets/PngImages/Group4071.png')} style={styles.homePhoto} />
            </View>
            <View style={styles.loginInput}>
                <Text style={styles.loginscreenText}>
                    Login to your Account
                </Text>
            </View>
            <View style={{ top: 4 }}>
                <View style={styles.FlatButton}>
                    <FlatButton style={styles.FlatButton} name="phone" title={'Continue With Phone'}>
                    </FlatButton>
                </View>
                <View style={styles.FlatButton}>
                    <FlatButton name="google" title={'Continue With google'}>
                    </FlatButton>
                </View>
                <View style={styles.FlatButton}>
                    <FlatButton name='facebook' title={'Continue With Facebook'}>

                    </FlatButton>
                </View>
                <View style={styles.FlatButton}>
                    <FlatButton name='apple' title={'Continue With Apple'}>

                    </FlatButton>
                </View>
            </View>
            <TouchableOpacity>
                <Text style={{ color: '#4285F4' }}>
                    Continue Without login
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function DetailsScreen() {
    return (
        <View>
            <Text>Details</Text>
        </View>
    );
}

const RootStack = createNativeStackNavigator();

function FirstModal() {
    return (
        <NavigationContainer independent={true}>
            <RootStack.Navigator>
                <RootStack.Group>
                    <RootStack.Screen name="Home" component={HomeScreen} />
                    <RootStack.Screen name="Details" component={DetailsScreen} />
                </RootStack.Group>
                <RootStack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
                    <RootStack.Screen name="MyModal" component={ModalScreen} />
                </RootStack.Group>
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

export default FirstModal;

const styles = StyleSheet.create({
    ModalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white'
    },
    homePhoto: {
        bottom: '15%',
        width: 250,
        height: 300
    },
    loginInput: {
        bottom: '3%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        color: '#10151E',
        fontSize: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },


    Icon: {
        left: 170,
        bottom: 42
    },
    FlatButton: {
        paddingBottom: 6,
    },
    loginscreenText: {
        fontWeight: 'bold',
        fontSize: 16,
        position: 'absolute',
        color: '#0A0B0E',
    },



})