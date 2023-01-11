import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Touchable, TouchableOpacityBase, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-paper'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const Data = [
    {
        id: 1,
        image: require('../../assets/BuyerRequestCardImage/user.png'),
        title: 'Sunail Ahmed Sent you an Offer against your request.',
        date: '1 day ago'
    },
    {
        id: 2,
        image: require('../../assets/BuyerRequestCardImage/user.png'),
        title: 'Danish Karim Sent you an Offer against your request.',
        date: '1 day ago'
    },
    {
        id: 3,
        image: require('../../assets/BuyerRequestCardImage/gilgitApp.png'),
        title: 'You have successfully upload a new item on GilgitApp',
        date: '1 day ago'
    },
    {
        id: 4,
        image: require('../../assets/BuyerRequestCardImage/user.png'),
        title: 'Naveed Baig Sent you an Offer against your request.',
        date: '1 day ago'
    }

]




const NotificationItem = ({ item, onPress, backgroundColor, textColor, }) => (
    <TouchableOpacity style={{ padding: 2 }}>
        <View style={styles.notificationBox}>
            <View style={styles.imageBox}>
                <Image source={item.image} />
            </View>
            <View style={styles.notificationsTextBox}>
                <Text style={styles.notificationText}>{item.title}</Text>
                <Text>{item.date}</Text>
            </View>
            <View>
                <MIcon name='dots-vertical' size={42} color='#A3A3A3' style={{ paddingTop: 10 }} />
            </View>
        </View>
    </TouchableOpacity>
);

const Notifications = () => {

    const [selectedId, setSelectedId] = useState(null);
    const navigation = useNavigation();
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "white" : "white";
        const color = item.id === selectedId ? 'black' : 'black';
        return (

            <NotificationItem
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}

            />
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: '#E5E5E5' }}>
            <Divider />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Favourite')}>
                    <Text style={styles.topBarText}>Notifications</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity>
                    <Text style={styles.topBarText}>Favourites</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Today</Text>
            <TouchableOpacity>

                <View style={styles.notificationBox}>
                    <View style={styles.imageBox}>
                        <Image source={require('../../assets/BuyerRequestCardImage/user.png')} />
                    </View>
                    <View style={styles.notificationsTextBox}>
                        <Text style={styles.notificationText}>Naveed Baig Sent you an Offer against your request.</Text>
                        <Text>Just now</Text>
                    </View>
                    <View>
                        <MIcon name='dots-vertical' size={42} color='#A3A3A3' style={{ paddingTop: 10 }} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>

                <View style={styles.notificationBoxT}>
                    <View style={styles.imageBox}>
                        <Image source={require('../../assets/BuyerRequestCardImage/gilgitApp.png')} />
                    </View>
                    <View style={styles.notificationsTextBox}>
                        <Text style={styles.notificationText}>You have successfully posted buyer request on GilgitApp</Text>
                        <Text>5 Hours ago</Text>
                    </View>
                    <View>
                        <MIcon name='dots-vertical' size={42} color='#A3A3A3' style={{ paddingTop: 10 }} />
                    </View>
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>Yesterday</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={Data}
                renderItem={renderItem}
                extraData={selectedId}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFFFF',
        width: 400,
        height: 50
    },
    topBarText: {
        textAlign: 'center',
        top: 14,
        fontSize: 16,
        fontWeight: '500',
        color: '#0A0B0E'

    },
    notificationBox: {

        top: 2,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        flexDirection: 'row',
        width: 410,

    }, imageBox: {

        height: 85,
        top: 20,
        paddingLeft: 10

    },
    notificationsTextBox: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '75%',
        alignSelf: 'center',
        paddingLeft: 25
    },
    notificationText:
    {
        fontSize: 14,
        fontWeight: '400',
        color: '#0A0B0E'
    },
    notificationBoxT: {
        top: 6,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        flexDirection: 'row',
        width: 410,

    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#0A0B0E',
        paddingTop: 10,
        paddingLeft: 4
    }
})



export default Notifications