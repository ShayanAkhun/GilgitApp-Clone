import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import ItemProfile from '../../screens/ItemsDashboard/ItemProfile'
import { CategorySliderStore } from '../../store/categorySlider'
import { categorySlider } from '../../Types'


const { width, height } = Dimensions.get('window')
console.log(width)

interface IProps {
    item: categorySlider
    onEdit?: () => void
}

export const Card: React.FC<IProps> = ({ item }) => {
    console.log({ height });

    return (
        <View style={styles.CardComponent}>
            <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Image source={item.image} />
                <View style={styles.CardData}>
                    <View style={styles.CardDataRight}>
                        <Text style={styles.CardAmount}>{item.price}</Text>
                        <Text style={styles.CardDescription}>{item.description}</Text>
                        <Text style={styles.CardLocation}>{item.location}</Text>
                    </View>
                    <View style={styles.CardDataLeft}>
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
        width: width / 2.3,
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