import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons';
import { Divider } from 'react-native-paper';
const Data = [

    {
        id: 1,
        image: require('../../assets/MessagesImages/first.png'),
        title: 'Irfan Baig',
        description: 'Is this item avaliable?'
    },
    {
        id: 2,
        image: require('../../assets/MessagesImages/second.png'),
        title: 'Somi Datoo',
        description: 'Yes thanks'
    }, {
        id: 3,
        image: require('../../assets/MessagesImages/third.png'),
        title: 'Danish  Ali',
        description: 'Yes I am coming please wait thanks?'
    }, {
        id: 4,
        image: require('../../assets/MessagesImages/fourth.png'),
        title: 'Sunail Ahmed',
        description: 'Yes Sure?'
    },
    {
        id: 5,
        image: require('../../assets/MessagesImages/fifth.png'),
        title: 'Afaq karim',
        description: 'Is this item avaliable?'
    },
    {
        id: 6,
        image: require('../../assets/MessagesImages/first.png'),
        title: 'Irfan Baig',
        description: 'Is this item avaliable?'
    },
    {
        id: 7,
        image: require('../../assets/MessagesImages/second.png'),
        title: 'Somi Datoo',
        description: 'Yes thanks'
    }, {
        id: 8,
        image: require('../../assets/MessagesImages/third.png'),
        title: 'Danish  Ali',
        description: 'Yes I am coming please wait thanks?'
    }, {
        id: 9,
        image: require('../../assets/MessagesImages/fourth.png'),
        title: 'Sunail Ahmed',
        description: 'Yes Sure?'
    },
    {
        id: 10,
        image: require('../../assets/MessagesImages/fifth.png'),
        title: 'Afaq karim',
        description: 'Is this item avaliable?'
    }
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity>
        <Divider />
        <View style={{ flexDirection: 'row', margin: 10 }}>
            <Image source={item.image} />
            <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
        <Divider />
    </TouchableOpacity>
)



const MessagesScreen = () => {
    const [number, onChangeNumber] = useState('');
    const [selectedId, setSelectedId] = useState(null);

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
        <View style={styles.MessagesContainer}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Search"

            />
            <FlatList
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <Divider />}
                data={Data}
                renderItem={renderItem}
                extraData={selectedId}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    MessagesContainer: {
        backgroundColor: '#ffffff',
        padding: 4,
        flex: 1

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

    }, title: {
        fontSize: 18,
        fontWeight: '400',
        color: '#1C1C1C'
    },
    description: {
        fontSize: 14,
        fontWeight: '300',
        color: '#636363'
    }

})

export default MessagesScreen