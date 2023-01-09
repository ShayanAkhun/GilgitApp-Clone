import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import ItemProfile from '../../screens/ItemsDashboard/ItemProfile'


const item = [
    {
        id: 1,
        image: require('../../assets/CardComponentImages/Macbook.png'),
        title: 'Apple Macbook Pro',
        price: 'PKR 1,95000',
        location: 'Gilgit',
        views: 109,
        date: '13 feb'
    },
    {
        id: 2,
        image: require('../../assets/CardComponentImages/Hp.png'),
        title: 'HP laptop',
        price: 'PKR 95,000',
        location: 'Gilgit',
        views: 354,
        date: '01 April'
    },
    {
        id: 3,
        image: require('../../assets/CardComponentImages/Bike.png'),
        title: 'Honda 125',
        price: 'PKR 105,000',
        location: 'Gilgit',
        views: 569,
        date: '11 July'
    },
    {
        id: 4,
        image: require('../../assets/CardComponentImages/Honda.png'),
        title: 'Honda 200',
        price: 'PKR 295,000',
        location: 'Gilgit',
        views: 1004,
        date: '1 Jan'
    },
    {
        id: 5,
        image: require('../../assets/CardComponentImages/Mustang.png'),
        title: 'MUstang',
        price: 'PKR 4000,000',
        location: 'Gilgit',
        views: 1440,
        date: '14 Aug'
    },

]
export const Card = ({ item }) => {
    return (
        <View style={styles.CardComponent}>
            <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Image source={item.image} />
                <View style={styles.CardData}>
                    <View style={styles.CardDataRight}>
                        <Text style={styles.CardAmount}>{item.price}</Text>
                        <Text style={styles.CardDescription}>{item.title}</Text>
                        <Text style={styles.CardLocation}>{item.location}</Text>
                    </View>
                    <View style={styles.CardDataLeft}>
                        <Text style={styles.CardDate}>{item.date}</Text>
                        <Text style={styles.CardViews}>{item.views}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    CardComponent: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        width: 185,
        height: 268,
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
        justifyContent: 'space-between'
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
        fontSize: 14,
        color: '#1C1C1C',
        fontWeight: '400'
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
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    CardDataLeft: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    }

})