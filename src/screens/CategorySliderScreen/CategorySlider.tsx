import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { CategorySliderStore } from '../../store/categorySlider';
import { Card } from '../../components/Card/Card';
import { categorySlider } from '../../Types';



const { width, height } = Dimensions.get('window')

export const CategorySlider = () => {
  const [text, onChangeText] = useState('');

  const slider = CategorySliderStore(state => state.slider);
  const setSelectedSlider = CategorySliderStore(state => state.setSelectedSlider);

  const sliderEditHandler = (slider: categorySlider) => {
    setSelectedSlider(slider);
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
        {slider.map(slider => (
          console.log(slider),
          <Card item={slider} onEdit={() => sliderEditHandler(slider)} />
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