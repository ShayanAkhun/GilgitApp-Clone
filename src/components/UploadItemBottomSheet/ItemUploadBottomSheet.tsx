import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const UploadItemBottomSheet = () => {
    const sheetRef = useRef<BottomSheet>(null);
    const navigation = useNavigation();

    const data = [useMemo(
        () =>
            Array(18)
                .fill(0)
                .map((_, index) => `${index}`), []),
    {
        id: 1,
        image: require('../../assets/UploadItemsImages/BuyerRequests.png'),
        title: 'Buyer Requests',
        screenNavigation: 'UploadItems'
    },
    {
        id: 2,
        image: require('../../assets/UploadItemsImages/Cars&SUVs.png'),
        title: 'Cars & SUVs',
        screenNavigation: 'UploadItems'
    },
    {
        id: 3,
        image: require('../../assets/UploadItemsImages/Bikes.png'),
        title: 'Bikes',
        screenNavigation: 'UploadItems'
    },
    {
        id: 4,
        image: require('../../assets/UploadItemsImages/Mobiles&Accessories.png'),
        title: 'Mobiles & Accessories',
        screenNavigation: 'UploadItems'
    },
    {
        id: 5,
        image: require('../../assets/UploadItemsImages/Laptops&Accessories.png'),
        title: 'Laptops & Accessories',
    },
    {
        id: 6,
        image: require('../../assets/UploadItemsImages/Electronics.png'),
        title: 'Electronics',
    },
    {
        id: 7,
        image: require('../../assets/UploadItemsImages/Homes.png'),
        title: 'Homes',
    },
    {
        id: 8,
        image: require('../../assets/UploadItemsImages/Pets.png'),
        title: 'Pets',
    },
    {
        id: 9,
        image: require('../../assets/UploadItemsImages/Furniture.png'),
        title: 'Furniture',
    },
    {
        id: 10,
        image: require('../../assets/UploadItemsImages/Fashion.png'),
        title: 'Fashion',
    },
    {
        id: 11,
        image: require('../../assets/UploadItemsImages/DryFruits.png'),
        title: 'DryFruits',
    },
    {
        id: 12,
        image: require('../../assets/UploadItemsImages/Books.png'),
        title: 'Books',
    },
    {
        id: 13,
        image: require('../../assets/UploadItemsImages/FreeItems.png'),
        title: 'Free Items',
    },
    {
        id: 14,
        image: require('../../assets/UploadItemsImages/Others.png'),
        title: 'Others',
    },];
    const snapPoints = useMemo(() => ['98%', "50%", "98%"], []);

    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    const renderItem = useCallback(
        ({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.screenNavigation)}>
                <View style={styles.itemContainer}>
                    <>
                        <Image style={styles.images} source={item.image} />
                        <Text style={{ marginHorizontal: 8 }}>{item.title}</Text>
                    </>
                </View>
                <Divider style={{ top: 2 }} />
            </TouchableOpacity>
        ),
        []
    );
    return (
        <View style={styles.container}>
            {/* <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
            <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
            <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
            <Button title="Close" onPress={() => handleClosePress()} /> */}
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
                <BottomSheetFlatList
                    data={data}
                    // keyExtractor={(i) => i}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                />
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
    },
    contentContainer: {
        backgroundColor: "#ffffff",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#ffffff",
        flexDirection: 'row',

    },
    images: {

    }
});

export default UploadItemBottomSheet;