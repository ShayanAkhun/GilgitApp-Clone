import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Data = [
    {
        id: 1,
        title: 'Full Name',
        textinput: 'Full Name'
    },
    {
        id: 2,
        title: 'Email',
        textinput: 'Email'
    },
    {
        id: 3,
        title: 'Location',
        textinput: 'Location'
    },
    {
        id: 4,
        title: 'Contact Number',
        textinput: 'Contact Number'
    }, {
        id: 5,
        title: 'WhatsApp Number',
        textinput: 'WhatsApp Number'
    }
]


const Item = ({ item, onPress, backgroundColor, textColor }) => {
    const [text, onChangeText] = React.useState('');
    return (
        <View>

            <View style={styles.container}>
                <Text style={styles.Text}>{item.title}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={item.textinput}
                />
            </View>

        </View>
    )
}



const SignUpFormData = () => {
    const [selectedId, setSelectedId] = useState(0);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "white" : "white";
        const color = item.id === selectedId ? 'black' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={Data}
            renderItem={renderItem}
            extraData={selectedId}
        />
    );

}

export default SignUpFormData


const styles = StyleSheet.create({


    container: {
        backgroundColor: '#ffff',
        top: 50,
        height: 100,

    },
    input: {
        width: 350,
        borderRadius: 3,
        height: 48,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#0A0B0E',
        backgroundColor: '#FFFFFF'

    },
    Text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#0A0B0E',
        marginHorizontal: 7
    },

})