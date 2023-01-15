import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatButton } from '../../components';
import { Icon } from '../../components/Icons/Icons';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';


export const FirstScreen = ({ navigation }) => {
    const [user, setUser] = React.useState({})
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '955202559448-6sro7qhfc2ul43bjtr97un1ul8c7i2qb.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,

        })
        isSignedIn()
    }, [])

    const signIn = async () => {
        try {
            GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn()
            console.log('due____', userInfo)
            setUser(userInfo)
        } catch (error: any) {
            console.log('Message____', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login request');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing in Please wait');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services not availabe');
            } else {
                console.log('Something went wrong please try again');

            }
        }
    }


    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!!isSignedIn) {
            getCurrentUserInfo()
        } else {
            console.log('Please Login');

        }
    }


    const getCurrentUserInfo = async () => {
        try {

            const userInfo = await GoogleSignin.signInSilently();
            console.log('edit____', user);
            setUser(userInfo)
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed In yet');
                console.log('User has not signed In yet');

            } else {
                alert('Something went wrong please try again later')
                console.log('Something went wrong please try again later');

            }
        }

    }
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut()
            setUser({})
        } catch (error: any) {
            console.error(error);

        }
    }



    return (
        <View style={styles.loginscreen}>
            <Image source={require('../../assets/PngImages/Group4071.png')} style={styles.homePhoto} />
            <View style={styles.loginInput}>
                <Text style={styles.loginscreenText}>
                    Login to your Account
                </Text>
            </View>
            <View style={styles.Buttons}>
                <View style={styles.FlatButton}>
                    <FlatButton name='phone' title={'Continue With Phone'} onPress={() => navigation.navigate('ItemsDashboard')}>
                    </FlatButton>
                </View>
                <View style={styles.FlatButton}>
                    {/* <FlatButton name='google' title={'Continue With google'} onPress={() => navigation.navigate('MessagesScreen')}>
                    </FlatButton> */}
                    <GoogleSigninButton style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signIn} />


                    <TouchableOpacity onPress={signOut}>
                        <Text>SignOut</Text>
                    </TouchableOpacity>
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
                <Text style={{ color: '#4285F4', top: 30 }} onPress={() => navigation.navigate('MainTabs')}>
                    Continue Without login
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginscreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    Buttons: {
        top: 30
    },
    loginscreenText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#0A0B0E',
    },
    homePhoto: {
        width: 250,
        height: 300,
    },
    loginInput: {
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    FlatButton: {
        paddingBottom: 6,
    },


})
