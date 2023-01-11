import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { LaptopsStore } from '../../store/Laptops';
import { Card } from '../../components/Card/Card';
import { Laptops } from '../../Types';



const { width, height } = Dimensions.get('window')

export const LaptopScreen = () => {
  const [text, onChangeText] = useState('');

  const laptops = LaptopsStore(state => state.laptops);
  const setSelectedLaptops = LaptopsStore(state => state.setSelectedLaptops);

  const EditHandler = (laptops: Laptops) => {
    setSelectedLaptops(laptops);
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
        {laptops.map(laptops => (
          console.log(laptops),
          <Card item={laptops} onEdit={() => EditHandler(laptops)} />
        ))}
      </View>


    </ScrollView>
  )
}


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