import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IProps {
    title: string;
    name: string,
    onPress?: () => void;
}

export const FlatButton: React.FC<IProps> = ({ title, onPress, name }) => {
    return (
        <TouchableOpacity style={styles.ButtonBorder} onPress={onPress}>
            <View style={{ left: 35 }}>
                <Icon name={name} size={24} />
            </View>
            <Text style={styles.ButtonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ButtonBorder: {
        borderColor: '#6C6C6C',
        borderWidth: 1,
        border: 1,
        borderRadius: 3,
        paddingVertical: 14,
        width: 335,
        height: 52,
        marginBottom: 10
    },
    ButtonText: {
        color: '#0A0B0E',
        fontFamily: 'Poppins-Light',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 14,
        textAlign: 'center',
        bottom: 22
    }
})