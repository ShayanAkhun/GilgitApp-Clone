import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { UploadItem, LaptopsCategory } from '../../Types';
import { uploadItemStore } from '../../store';
import {
    Input,
    FormControl,
    Stack,
    Button,
    AddIcon,
    Select,
    CheckIcon,
    ArrowDownIcon
} from 'native-base';
import * as  ImagePicker from 'react-native-image-picker';
import MIcon from 'react-native-vector-icons/MaterialIcons';


const { width } = Dimensions.get('window')
const height = Dimensions.get('window').height;


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

    const laptops = (Object?.keys(LaptopsCategory) as (keyof typeof LaptopsCategory)[])?.map(key => {
        return LaptopsCategory[key]
    })


    return (
        <View style={{ backgroundColor: '#ffff', flex: 1, }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.Addphoto}>
                    <TouchableOpacity onPress={handleImageUpload}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: 'gray.500' }} >
                            Add Photo
                        </Text>
                        <View style={{ alignSelf: 'center' }}>
                            <AddIcon size={6} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    render={({ errors, handleChange, values, handleSubmit }) => {
                        return (
                            <FormControl style={styles.FormControl}>
                                <Stack mx='2'>
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
                                    <Select
                                        selectedValue={itemType ?? ''}
                                        minWidth="200"
                                        accessibilityLabel="Category"
                                        placeholder="Manufacturer E.G Apple, Dell, Hp Etc"
                                        _selectedItem={{
                                            bg: 'gray.300',
                                            endIcon: <CheckIcon size="4" />,
                                        }}
                                        mt={1}
                                        onValueChange={item => setItemType(item)}
                                    >
                                        {laptops.map(item => {
                                            return <Select.Item label={item} value={item} />;
                                        })}
                                    </Select>
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



                                </Stack>

                                <View style={{ top: 10 }}>
                                    <Text style={styles.Negotation}>Condition</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 60, marginTop: 10 }}>

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


                                <Text style={styles.Warranty}>Warranty</Text>
                                <View style={{ flexDirection: 'column', marginHorizontal: 10, marginVertical: 12, marginTop: 20 }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 10, marginVertical: 16, marginHorizontal: 20 }} >

                                            <Button style={{
                                                backgroundColor: thirdColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                                height: 45
                                            }} onPress={() => setThirdColor(!thirdColor)}>
                                                <Text style={{ color: thirdColor ? '#1C1C1C' : '#ffffff' }}>7 Days</Text>
                                            </Button>

                                            <Button style={{
                                                backgroundColor: fourthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                                height: 45
                                            }}
                                                onPress={() => setFourthColor(!fourthColor)}>
                                                <Text style={{ color: fourthColor ? '#1C1C1C' : '#ffffff' }}>15 Days</Text>
                                            </Button>
                                            <Button style={{
                                                backgroundColor: fifthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                                height: 45
                                            }} onPress={() => setFifthColor(!fifthColor)}>
                                                <Text style={{ color: fifthColor ? '#1C1C1C' : '#ffffff' }}>30 Days</Text>
                                            </Button>
                                            <Button style={{
                                                backgroundColor: sixthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                                height: 45,

                                            }} onPress={() => setSixthColor(!sixthColor)}>
                                                <Text style={{ color: sixthColor ? '#1C1C1C' : '#ffffff', }}>No Warranty</Text>
                                            </Button>
                                        </View>
                                    </ScrollView>
                                </View>
                                <View>
                                    <TouchableOpacity>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#4285F4', fontFamily: 'Poppins-Light', fontSize: 17, letterSpacing: 1, fontWeight: '500', marginHorizontal: 8, }}>
                                                Additional Information
                                            </Text>
                                            <MIcon name='keyboard-arrow-down' size={32} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ alignSelf: 'center', padding: 10 }}>
                                    <Button style={styles.SellButton} onPress={() => handleSubmit()}>
                                        {itemEditing ? 'Update' : 'Sell Now'}
                                    </Button>
                                </View>



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
        borderWidth: 1,
        borderColor: 'gray.300',
        height: 150,
        width: 150,
        bottom: 40,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 150,
        top: 20
    },
    FormControl: {
        width: '100%',
        // height: height * 1
        height: '100%',
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
        fontFamily: 'Poppins',
        marginHorizontal: 8,

    },
    Warranty: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '500',
        top: 20,
        marginHorizontal: 8,
        fontFamily: 'Poppins'

    },
    SellButton: {
        backgroundColor: '#4285F4',
        width: 360,


    }

})