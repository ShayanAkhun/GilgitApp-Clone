import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LaptopsStore } from '../../store/Laptops';
import { Card } from '../../components/Card/Card';
import { CarsStore } from '../../store';
import { Cars } from '../../Types';


const { width, height } = Dimensions.get('window')

const CarsScreen = () => {
    const [text, onChangeText] = useState('');

    const cars = CarsStore(state => state.cars);
    const setSelectedCars = CarsStore(state => state.setSelectedCars);

    const EditHandler = (cars: Cars) => {
        setSelectedCars(cars);
    };



    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Search"
            />

            <View style={{ flexWrap: 'wrap', flexDirection: 'row', backgroundColor: '#ffffff' }}>
                {cars.map(cars => (
                    <Card item={cars} onEdit={() => EditHandler(cars)} />
                ))}
            </View>


        </ScrollView>
    )
}
export default CarsScreen

const styles = StyleSheet.create({
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
        flex: 1

    },
    ItemsList: {
        borderColor: '#F8F8F8',
    }


})