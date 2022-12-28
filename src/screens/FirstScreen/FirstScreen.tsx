import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatButton } from '../../components';
import { Icon } from '../../components/Icons/Icons';


export const FirstScreen = ({ navigation }) => {
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
                    <FlatButton name='phone' title={'Continue With Phone'}>
                    </FlatButton>
                </View>
                <View style={styles.FlatButton}>
                    <FlatButton name='google' title={'Continue With google'}>
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
                <Text style={{ color: '#4285F4', top: 30 }}>
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