import React, { Component } from "react";
import { View } from 'react-native'
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";



export const HeaderButton = () => {
    const navigation = useNavigation();
    return (
        <>
            <Button onPress={() => navigation.goBack()} style={{ backgroundColor: '#ffffff' }}>
                <Icon size={36} name='keyboard-arrow-left' />
            </Button>
        </>
    );

}