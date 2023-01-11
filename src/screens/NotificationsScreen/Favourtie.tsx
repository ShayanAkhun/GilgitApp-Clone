import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Favourite = () => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Favourtie</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Favourite