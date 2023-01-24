import React, { useEffect, useState } from "react";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Data = [
    {
        id: 1,
        image: require('../../assets/BuyerRequestCardImage/user.png'),
        title: ' Akhtar Lawa',
        location: 'Gilgit',
        item: 'Mobile',
        date: '13/02/2022',
        description: 'Hi muja mobile chaheya jo 8gb RAM ho or 128gb ki memory'
    },
    {
        id: 2,
        image: require('../../assets/BuyerRequestCardImage/user.png'),
        title: ' Sameer Aslam',
        location: 'Gilgit',
        item: 'Mobile',
        date: '01/04/2022',
        description: 'Hi muja mobile chaheya jo 8gb RAM ho or 128gb ki memory'
    },
    {
        id: 3,
        image: require('../../assets/BuyerRequestCardImage/user.png'),
        title: ' Hakeem Sardar',
        location: 'Gilgit',
        item: 'Mobile',
        date: '11/07/2021',
        description: 'Hi muja mobile chaheya jo 8gb RAM ho or 128gb ki memory'
    },
    {
        id: 4,
        image: require('../../assets/BuyerRequestCardImage/user.png'),
        title: ' Adnan ',
        location: 'Gilgit',
        item: 'Mobile',
        date: '01/01/2022',
        description: 'Hi muja mobile chaheya jo 8gb RAM ho or 128gb ki memory'
    },
    {
        id: 5,
        image: require('../../assets/BuyerRequestCardImage/user.png'),
        title: 'Little Broung',
        location: 'Gilgit',
        item: 'Mobile',
        date: '14/08/2020',
        description: 'Hi muja mobile chaheya jo 8gb RAM ho or 128gb ki memory'
    },
];
const BuyerRequests = () => {
    const [user, setUser] = useState({ name: '' });

    useEffect(() => {
        const subscriber = firestore().collection('MessagesUsers').doc('HWQWVppkV1YBiyZF5uWl').onSnapshot(doc => {
            setUser({
                name: doc.data().name
            });
        });

        return () => subscriber();
    }, []);

    const getUser = async () => {
        const userDocument = await firestore().collection('MessagesUsers').doc('HWQWVppkV1YBiyZF5uWl').get();
    }

    useEffect(() => {
        getUser();
    }, []);



    const Item = ({ item, onPress, backgroundColor, textColor }) => (

        <View style={styles.CardComponent}>
            <TouchableOpacity>
                <View style={styles.CardData}>
                    <Image source={item.image} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.CardDescription}>{user.name}</Text>
                        <View style={styles.CardDataRight}>
                            <Text style={styles.CardDate}>{item.date}</Text>
                            <Text style={styles.CardLocation}>{item.location}</Text>
                            <Text style={styles.CardViews}>{item.item}</Text>
                        </View>
                        <View style={styles.CardDataLeft}>
                            <Text style={styles.decription}>{item.description}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        </View>


    );

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
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Data}
            renderItem={renderItem}
            extraData={selectedId}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
    },
    images: {
        alignItems: 'center',
    },
    CardComponent: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        width: 280,
        height: 110,
        borderColor: '#FFFFFF',
        borderRadius: 3,
        shadowOffsetY: 3,
        shadowOffsetX: 6,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        padding: 5,
        margin: 10,
        elevation: 2

    },
    CardData: {
        flexDirection: 'row',
    },
    CardAmount: {
        color: '#1C1C1C',
        fontSize: 16,
        fontWeight: '500'
    },
    CardDate: {
        fontSize: 12,
        color: '#1C1C1C',
        fontWeight: '400'
    },
    CardDescription: {
        color: '#1C1C1C',
        fontSize: 16,
        fontWeight: '500'
    },
    CardLocation: {
        fontSize: 12,
        color: '#1C1C1C',
        fontWeight: '400'
    },
    CardViews: {
        fontSize: 12,
        color: '#1C1C1C',
        fontWeight: '400'
    },
    CardDataRight: {
        flexDirection: 'row',
        right: 28,
        justifyContent: 'space-evenly',
    },
    CardDataLeft: {
        right: 40,
        paddingVertical: 18,
    },
    decription: {
        fontSize: 12
    }

});

export default BuyerRequests