import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Card } from '../../components/Card/Card';

export const CategorySlider = () => {
  const [text, onChangeText] = useState('');
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Search"
      />

      <View
        style={styles.ItemsList}>
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
    marginTop: 20

  },
  ItemsList: {
    borderColor: '#F8F8F8',
  }


})