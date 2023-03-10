import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatButton } from '../../components';
import { Icon } from '../../components/Icons/Icons';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore'

export const FirstScreen = ({ navigation }) => {




    GoogleSignin.configure({
        webClientId: '955202559448-6sro7qhfc2ul43bjtr97un1ul8c7i2qb.apps.googleusercontent.com',
        offlineAccess: true,
        forceCodeForRefreshToken: true,

    })

    const [user, setUser] = React.useState({})
    useEffect(() => {

        isSignedIn()
    }, [])

    const signIn = async () => {
        try {
            GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn()
            console.log('due____', userInfo)
            setUser(userInfo)
        } catch (error: any) {
            console.log('Message____????', error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login request');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing in Please wait');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services not availabe');
            } else {
                console.log('Something went wrong please try again idk whats wrong');

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
                // alert('User has not signed In yet');
                console.log('User has not signed In yet');

            } else {
                // alert('Something went wrong please try again later')
                console.log('Something went wrong please try again later sign error');

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



    const getUser = async () => {
        const userDocument = await firestore().collection('Users').doc('TG0DWiqmLlelNRlg4WQd').get()
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
                    <FlatButton name='phone' title={'Continue With Phone'} >
                    </FlatButton>
                </View>
                <View style={styles.FlatButton}>
                    <GoogleSigninButton style={{
                        width: 335,
                        height: 62,
                        marginBottom: 10,
                        borderColor: '#6C6C6C',

                    }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={signIn} />


                </View>
                <View style={styles.FlatButton}>
                    <FlatButton name='facebook' title={'Continue With Facebook'} >
                    </FlatButton>
                </View>
                <View style={styles.FlatButton}>
                    <FlatButton name='apple' title={'Continue With Apple'}>
                    </FlatButton>
                </View>

                <TouchableOpacity onPress={signOut}>
                    <Text>SignOut</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity >
                    <Text style={{ color: '#4285F4', top: 30, fontFamily: 'Poppins-Light', fontWeight: '500' }} onPress={() => navigation.navigate('MainTabs')}>
                        Continue Without login
                    </Text>
                </TouchableOpacity>
            </View>
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
        // fontWeight: 'bold',
        fontSize: 16,
        color: '#0A0B0E',
        fontFamily: 'Poppins-Light'
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






