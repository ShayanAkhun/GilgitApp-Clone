import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
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
    Button,
    AddIcon,
} from 'native-base';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as  ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/app';


const { width, height } = Dimensions.get('window')



const validationSchema = Yup.object().shape({
    name: Yup.string().required('title is a required field'),
    price: Yup.string().required('Price is a required field'),
    location: Yup.string().required('location is a required field'),
    description: Yup.string().required('description is a required field'),
    manufacturer: Yup.string().required('manufacturer is a required field'),
})
export const LaptopsUploadItems = () => {
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
    const [fifthColor, setFifthColor] = useState(true)
    const [sixthColor, setSixthColor] = useState(true)

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
            })
        }
        setItem(itemState);
        navigation.goBack();
    }
    const handleImageUpload = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            console.log('Images')
        })
    }
    console.log(height)


    return (
        <View style={{ backgroundColor: '#ffff', flex: 1, marginBottom: 8, height: 10 }}>
            <ScrollView>
                <View style={{ backgroundColor: '#ffff', }}>
                    <View style={styles.Addphoto}>
                        <TouchableOpacity onPress={handleImageUpload}>
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
                                        <Text style={styles.Negotation}>Condition</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 50, top: 8 }}>

                                            <Button style={{
                                                backgroundColor: color ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }} onPress={() => setColor(!color)}>
                                                <Text style={{ color: color ? '#1C1C1C' : '#ffffff' }}>New</Text>
                                            </Button>

                                            <Button style={{
                                                backgroundColor: secondColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }}
                                                onPress={() => setSecondColor(!secondColor)}>
                                                <Text style={{ color: secondColor ? '#1C1C1C' : '#ffffff' }}>Used</Text>
                                            </Button>
                                        </View>
                                    </View>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ top: 40, }}>
                                        <Text style={styles.Warranty}>Warranty</Text>
                                        <SafeAreaView style={{ flexDirection: 'row', justifyContent: 'space-between', right: 50, top: 8 }}>

                                            <Button style={{
                                                backgroundColor: thirdColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }} onPress={() => setThirdColor(!thirdColor)}>
                                                <Text style={{ color: thirdColor ? '#1C1C1C' : '#ffffff' }}>7 Days</Text>
                                            </Button>

                                            <Button style={{
                                                backgroundColor: fourthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }}
                                                onPress={() => setFourthColor(!fourthColor)}>
                                                <Text style={{ color: fourthColor ? '#1C1C1C' : '#ffffff' }}>15 Days</Text>
                                            </Button>
                                            <Button style={{
                                                backgroundColor: fifthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }} onPress={() => setFifthColor(!fifthColor)}>
                                                <Text style={{ color: fifthColor ? '#1C1C1C' : '#ffffff' }}>30 Days</Text>
                                            </Button>
                                            <Button style={{
                                                backgroundColor: sixthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 86,
                                                height: 42
                                            }} onPress={() => setSixthColor(!sixthColor)}>
                                                <Text style={{ color: sixthColor ? '#1C1C1C' : '#ffffff' }}>No Warranty</Text>
                                            </Button>
                                        </SafeAreaView>

                                    </ScrollView>
                                    <Button style={styles.SellButton} onPress={() => handleSubmit()}>
                                        {itemEditing ? 'Update' : 'Sell Now'}
                                    </Button>
                                </Stack>



                            </FormControl>
                        )
                    }} />
            </ScrollView>
        </View>


    )
}



const styles = StyleSheet.create({
    Addphoto: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginTop: 50,
        borderColor: 'gray.300',
        height: 150,
        width: width / 2,
        bottom: 40,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
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
        fontWeight: '500',

    },
    Warranty: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '500',
        top: 28,

    },
    SellButton: {
        backgroundColor: '#4285F4',
        width: 360,


    }

})