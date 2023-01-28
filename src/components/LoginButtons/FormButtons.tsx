import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';



interface IProps {
    text?: string,
    name?: string,
    isActive?: string,
    id?: string,
    onPress?: () => void;
}
export const GlobalButton: React.FC<IProps> = ({ text, onPress, isActive, name }) => {

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: isActive === name ? '#4285F4' : '#ECECEC' }]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: isActive === name ? '#ffffff' : '#1C1C1C' }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        width: 86,
        height: 42,
        borderRadius: 50,
        marginRight: 20
    },
    buttonText: {
        fontFamily: 'Poopins',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 1,
        alignContent: 'center'
    },

    FormButton: {
        width: 86,
        height: 42,
        borderRadius: 50
    },
    FormButtonText: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 3,
    }

});

