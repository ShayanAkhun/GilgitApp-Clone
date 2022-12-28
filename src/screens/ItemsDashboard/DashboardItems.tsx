import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Data = [
  {
    id: 1,
    image: require('../../assets/CategoriesImages/BR.png'),
    title: 'BRs',
  },
  {
    id: 2,
    image: require('../../assets/CategoriesImages/Car.png'),
    title: 'Cars',
  },
  {
    id: 3,
    image: require('../../assets/CategoriesImages/Bikes.png'),
    title: 'Bikes',
  },
  {
    id: 4,
    image: require('../../assets/CategoriesImages/Laptops.png'),
    title: 'Laptops',
  },
  {
    id: 5,
    image: require('../../assets/CategoriesImages/Pets.png'),
    title: 'Pets',
  },
  {
    id: 6,
    image: require('../../assets/CategoriesImages/Home.png'),
    title: 'Home',
  },
  {
    id: 7,
    image: require('../../assets/CategoriesImages/Offices.png'),
    title: 'Offices',
  },
  {
    id: 8,
    image: require('../../assets/CategoriesImages/Phones.png'),
    title: 'Mobile',
  },
  {
    id: 9,
    image: require('../../assets/CategoriesImages/Shops.png'),
    title: 'Shops',
  },
  {
    id: 10,
    image: require('../../assets/CategoriesImages/Plots.png'),
    title: 'Plots',
  },
  {
    id: 11,
    image: require('../../assets/CategoriesImages/Appliances.png'),
    title: 'Appliances',
  },
  {
    id: 12,
    image: require('../../assets/CategoriesImages/Furniture.png'),
    title: 'Furniture',
  },
  {
    id: 13,
    image: require('../../assets/CategoriesImages/Fashion.png'),
    title: 'Fashion',
  },
  {
    id: 14,
    image: require('../../assets/CategoriesImages/Others.png'),
    title: 'Others',
  },
];
const numColumns = 4;

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={styles.images}>
      <Image source={item.image} />
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);
const DashboardItems = () => {
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
});

export default DashboardItems