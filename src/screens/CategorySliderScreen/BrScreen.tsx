import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";


const Data = [
    {
        id: 1,
        name: 'Sunil Ahmed',
        date: '26/06/2022 Monday',
        description: 'Hi muja mobile chaheya jo 8gb RAM ho or 128gb ki memory',
        price: 'PKR: 30,00 ',
        image: require('../../assets/BuyerRequestCardImage/user.png')
    },
    {
        id: 2,
        name: 'Nadeem Ahmed',
        date: '21/08/2022 Monday',
        description: 'Hi muja mobile chaheya jo 8gb RAM ho or 128gb ki memory',
        price: 'PKR: 30,00 ',
        image: require('../../assets/BuyerRequestCardImage/user2.png')
    },
    {
        id: 3,
        name: 'Sammer Pandyea',
        date: '21/02/2022 Monday',
        description: 'Hi muja mobile chaheya jo 8gb RAM ho or 128gb ki memory',
        price: 'PKR: 30,00 ',
        image: require('../../assets/BuyerRequestCardImage/user3.png')
    },


]
const BUyerItem = ({ item, onPress, backgroundColor, textColor, }) => (
    <View style={styles.CardComponent}>

        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={onPress}>
            <View style={{ flexDirection: 'row', }}>
                <Image style={{ right: 10 }} source={item.image} />
                <Text style={styles.CardDescription}>{item?.name}</Text>
            </View>
            <Text style={styles.CardDate}>{item?.date}</Text>
            <Divider />
            <View style={styles.CardData}>
                <View style={styles.CardDataRight}>
                    <Text style={styles.CardLocation}>{item?.description}</Text>
                    <Text style={styles.CardAmount}>{item.price}</Text>
                </View>

            </View>
        </TouchableOpacity>
    </View>
);


const BuyerScreen = () => {
    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();
    const [text, onChangeText] = useState('');

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "white" : "white";
        const color = item.id === selectedId ? 'black' : 'black';
        console.log(item)
        return (

            <BUyerItem
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            // onPress={() => {
            //     console.log('is this working!', item.screenNavigation)
            //     navigation.navigate(item.screenNavigation)
            // }}
            />
        );
    };
    return (
        <View>
            <View style={{ backgroundColor: '#fffff' }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Search"
                />

            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={Data}
                renderItem={renderItem}
                extraData={selectedId}
            />
        </View>
    )
}

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
        width: 360,
        height: 160,
        borderColor: '#FFFFFF',
        borderRadius: 3,
        shadowOffsetY: 3,
        shadowOffsetX: 6,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        padding: 5,
        margin: 10,
        elevation: 2,

    },
    CardData: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CardAmount: {
        color: '#1C1C1C',
        fontSize: 16,
        fontWeight: '500',
        top: 10
    },
    CardDate: {
        fontSize: 12,
        color: '#1C1C1C',
        fontWeight: '400',
        left: 60,
        bottom: 26
    },
    CardDescription: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '400',
        left: 10
    },
    CardLocation: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '400',
    },
    CardViews: {
        fontSize: 12,
        color: '#1C1C1C',
        fontWeight: '400'
    },
    CardDataRight: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    CardDataLeft: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    input: {
        width: 350,
        borderRadius: 3,
        height: 48,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#F8F8F8',
        backgroundColor: '#E5E5E5',
        marginTop: 20,

    },
});


export default BuyerScreen