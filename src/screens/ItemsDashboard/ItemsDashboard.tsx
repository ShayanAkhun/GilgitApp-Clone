import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Image, } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import DashboardItems from './DashboardItems';
import ItemProfile from './ItemProfile';
import BuyerRequests from '../BuyerRequest/BuyerRequest';



const ItemsDashboard = () => {
    const [text, onChangeText] = useState('');
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.LocationBar}>
                    <Icon name='location' size={24} color='#494949' />
                    <Text>Current Location</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: '#4285F4', fontSize: 16, }}>Gilgit Baltistan</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Search"
            />
            <Text style={styles.categories}>Categories</Text>
            <DashboardItems />
            <View style={styles.RecentItemsContainer}>
                <View>
                    <View>
                        <Text style={styles.RecentItems}>
                            Recent Items Near you
                        </Text>
                        <ItemProfile />
                    </View>
                    <View>
                        <View style={styles.BR}>
                            <Text style={styles.BRtext}>
                                Buyer Requests
                            </Text>
                            <TouchableOpacity>
                                <Text style={{ color: '#4285F4', fontSize: 16 }}>View all</Text>
                            </TouchableOpacity>
                        </View>
                        <BuyerRequests />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ItemsDashboard


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    }, input: {
        width: 350,
        borderRadius: 3,
        height: 48,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#F8F8F8',
        backgroundColor: '#E5E5E5'

    }, topBar: {
        margin: 10,
    }, LocationBar: {
        right: 10,
        marginVertical: 8,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    categories: {
        color: '#0A0B0E',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8
    },
    RecentItemsContainer: {
        backgroundColor: '#F8F8F8'
    },
    RecentItems: {
        color: '#0A0B0E',
        fontSize: 18,
        marginVertical: 6,
        margin: 12,
    },
    BR: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingTop: 6
    },
    BRtext: {
        fontSize: 18,
        fontWeight: '500',
        color: '#1C1C1C'
    }


})