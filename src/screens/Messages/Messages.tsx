import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

const MessagesScreen = () => {
    const [text, onChangeText] = React.useState("Search");
    const [number, onChangeNumber] = React.useState('');
    return (
        <View style={styles.MessagesContainer}>

            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Search"

            />
        </View>
    )
}


const styles = StyleSheet.create({
    MessagesContainer: {
        backgroundColor: '#ffffff'
    },
    input: {
        width: 350,
        borderRadius: 3,
        height: 48,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#F8F8F8',
        backgroundColor: '#E5E5E5'

    },
})

export default MessagesScreen