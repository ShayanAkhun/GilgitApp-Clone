import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { UploadItem } from '../../Types';
import { uploadItemStore } from '../../store';
import {
    Input,
    FormControl,
    Stack,
    Select,
    CheckIcon,
    Button,
    AddIcon,
    Pressable
} from 'native-base';


const validationSchema = Yup.object().shape({
    name: Yup.string().required('title is a required field'),
    price: Yup.string().required('Price is a required field'),
    location: Yup.string().required('location is a required field'),
    description: Yup.string().required('description is a required field'),
    manufacturer: Yup.string().required('manufacturer is a required field'),
})
export const UploadItems = () => {
    const navigation = useNavigation();
    const itemEditing = uploadItemStore(state => state.itemEditing)
    const selectedItem = uploadItemStore(state => state.selectedItem)
    const item = uploadItemStore(state => state.item)
    const setItem = uploadItemStore(state => state.setItem)
    const [itemType, setItemType] = useState(itemEditing && selectedItem ? selectedItem.type : '')
    const [color, setColor] = useState(true)
    const [secondColor, setSecondColor] = useState(true)
    const [thirdColor, setThirdColor] = useState(true)
    const [fourthColor, setFourthColor] = useState(true)

    const initialValues: UploadItem = {
        name: itemEditing && selectedItem ? selectedItem.name : '',
        price: itemEditing && selectedItem ? selectedItem.price : '',
        description: itemEditing && selectedItem ? selectedItem.description : '',
        location: itemEditing && selectedItem ? selectedItem.location : '',
        type: itemEditing && selectedItem ? selectedItem.type : '',
        id: itemEditing && selectedItem ? selectedItem.id : '',
    }
    const onSubmit = (values: UploadItem,) => {
        const itemState = [...item]
        if (itemEditing && selectedItem) {
            console.log(values, 'is this working ');
            const updatedItems = {
                id: selectedItem.id,
                name: values.name,
                price: values.price,
                description: values.description,
                location: values.location,
                manufacturer: values.manufacturer,
                itemType,
            }
            const itemIndex = itemState.findIndex(i => i.id === selectedItem.id);
            itemState[itemIndex] = updatedItems;
        } else {
            itemState.push({
                id: Math.floor(Math.random() * 100),
                name: values.name,
                price: values.price,
                description: values.description,
                location: values.location,
                manufacturer: values.manufacturer
                // itemType
            })
        }
        setItem(itemState);
        navigation.goBack();
    }
    return (
        // <View style={{ flex: 1, marginBottom: 100 }}>

        <ScrollView style={{ backgroundColor: '#ffff', flex: 1, height: 100, marginBottom: 40 }}>
            <View style={{ backgroundColor: '#ffff', }}>
                <View style={styles.Addphoto}>
                    <TouchableOpacity>
                        <View style={{ alignSelf: 'center' }}>
                            <AddIcon size={6} />
                        </View>
                        <Text style={{ alignSelf: 'center', fontSize: 14, marginTop: 6, color: 'gray.500' }} >
                            Click here to upload a Picture
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                render={({ errors, handleChange, values, handleSubmit }) => {
                    return (
                        <FormControl style={styles.FormControl}>
                            <Stack mx='4'>
                                <FormControl.Label>Title</FormControl.Label>
                                <Input
                                    placeholder="e.g Dell Latitude, Apple Macbook pro etc..."
                                    value={values.name}
                                    onChangeText={handleChange('title')}
                                />
                                {errors.name && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>}
                                <FormControl.Label>Description</FormControl.Label>
                                <Input
                                    placeholder="Add some Description i.e, RAM, HDD, Generation etc..."
                                    style={styles.DescriptionInput}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                />
                                {errors.description && (
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
                                )}
                                <FormControl.Label>Manufacturer</FormControl.Label>
                                <Input
                                    placeholder="Manufacturer E.G, Apple, Dell, Hp etc..."
                                    value={values.manufacturer}
                                    onChangeText={handleChange('manufacturer')}
                                />
                                {errors.manufacturer && (
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.manufacturer}</Text>
                                )}
                                <FormControl.Label>Location</FormControl.Label>
                                <Input
                                    placeholder="Location"
                                    value={values.location}
                                    onChangeText={handleChange('Location')}
                                />
                                {errors.location && (
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.location}</Text>
                                )}
                                <FormControl.Label>Price</FormControl.Label>
                                <Input
                                    placeholder="e.g 30,000, 50,000, 100,0000 etc..."
                                    value={values.price}
                                    keyboardType={'numeric'}
                                    onChangeText={handleChange('Location')}
                                />
                                {errors.price && (
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.price}</Text>
                                )}
                                <View style={{ top: 10 }}>
                                    <Text style={styles.Negotation}>Negotiable</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 50, top: 8 }}>

                                        <Button style={{
                                            backgroundColor: color ? '#4285F4' : '#ECECEC',
                                            borderRadius: 50,
                                            width: 100,
                                        }} onPress={() => setColor(!color)}>
                                            <Text style={{ color: color ? '#ffffff' : '#1C1C1C' }}>Yes</Text>
                                        </Button>

                                        <Button style={{
                                            backgroundColor: secondColor ? '#4285F4' : '#ECECEC',
                                            borderRadius: 50,
                                            width: 100,
                                        }}
                                            onPress={() => setSecondColor(!secondColor)}>
                                            <Text style={{ color: secondColor ? '#ffffff' : '#1C1C1C' }}>No</Text>
                                        </Button>
                                    </View>
                                </View>
                                <View style={{ top: 40 }}>
                                    <Text style={styles.Negotation}>Available for Marcha</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 50, top: 8 }}>

                                        <Button style={{
                                            backgroundColor: thirdColor ? '#4285F4' : '#ECECEC',
                                            borderRadius: 50,
                                            width: 100,
                                        }} onPress={() => setThirdColor(!thirdColor)}>
                                            <Text style={{ color: thirdColor ? '#ffffff' : '#1C1C1C' }}>Yes</Text>
                                        </Button>

                                        <Button style={{
                                            backgroundColor: fourthColor ? '#4285F4' : '#ECECEC',
                                            borderRadius: 50,
                                            width: 100,
                                        }}
                                            onPress={() => setFourthColor(!fourthColor)}>
                                            <Text style={{ color: fourthColor ? '#ffffff' : '#1C1C1C' }}>No</Text>
                                        </Button>
                                    </View>
                                </View>
                                <Button style={styles.SellButton} onPress={() => handleSubmit()}>
                                    {itemEditing ? 'Update' : 'Sell Now'}
                                </Button>

                            </Stack>
                        </FormControl>
                    )
                }} />
        </ScrollView>
        // </View>

    )
}



const styles = StyleSheet.create({
    Addphoto: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginTop: 50,
        borderColor: 'gray.300',
        height: 150,
        width: 600,
        bottom: 40,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 150,
        borderWidth: 1,
        textDecorationStyle: 'dotted'

    },
    FormControl: {
        width: '100%',
        alignSelf: 'center'
    },
    DescriptionInput: {
        width: 380,
        height: 100,
        textAlignVertical: 'top'
    },
    Negotation: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '500'
    },
    SellButton: {
        backgroundColor: '#4285F4',
        marginTop: 65,

    }

})