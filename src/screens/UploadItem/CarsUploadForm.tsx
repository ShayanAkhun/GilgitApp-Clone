import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Cars, CarsCategory } from '../../Types';
import { CarsStore } from '../../store';
import {
    Input,
    FormControl,
    Stack,
    Button,
    AddIcon,
    Select,
    CheckIcon,
} from 'native-base';
const { width, height } = Dimensions.get('window')

const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required'),
    price: Yup.string().required('This field is required'),
    location: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
    image: Yup.string().required('You should Upload at least one image'),
    manufacturer: Yup.string().required('This field is required'),
    title: Yup.string().required('This field is required'),

})
export const CarsUploadItems = () => {
    const navigation = useNavigation();
    const carsEditing = CarsStore(state => state.carsEditing)
    const selectedCars = CarsStore(state => state.selectedCars)
    const cars = CarsStore(state => state.cars)
    const setItem = CarsStore(state => state.setCars)
    const [carType, setCarType] = useState(carsEditing && selectedCars ? selectedCars.type : '')
    const [color, setColor] = useState(true)
    const [secondColor, setSecondColor] = useState(true)
    const [thirdColor, setThirdColor] = useState(true)
    const [fourthColor, setFourthColor] = useState(true)
    const [fifthColor, setFifthColor] = useState(true)
    const [sixthColor, setSixthColor] = useState(true)

    const initialValues: Cars = {
        title: carsEditing && selectedCars ? selectedCars.title : '',
        price: carsEditing && selectedCars ? selectedCars.price : '',
        description: carsEditing && selectedCars ? selectedCars.description : '',
        location: carsEditing && selectedCars ? selectedCars.location : '',
        type: carsEditing && selectedCars ? selectedCars.type : '',
        id: carsEditing && selectedCars ? selectedCars.id : '',
        manufacturer: carsEditing && selectedCars ? selectedCars.manufacturer : '',
    }
    const onSubmit = (values: Cars) => {
        const carsState = [...cars]
        if (carsEditing && selectedCars) {
            console.log(values, 'is this working ');
            const updatedItems = {
                id: selectedCars.id,
                title: values.title,
                price: values.price,
                description: values.description,
                location: values.location,
                // itemType,
            }
            const itemIndex = carsState.findIndex(i => i.id === selectedCars.id);
            carsState[itemIndex] = updatedItems;
        } else {
            carsState.push({
                id: Math.floor(Math.random() * 100),
                title: values.title,
                price: values.price,
                description: values.description,
                location: values.location,
            })
        }
        setItem(carsState);
        navigation.goBack();
    }
    const carsCategory = (Object?.keys(CarsCategory) as (keyof typeof CarsCategory)[])?.map(key => {
        return CarsCategory[key];
    });
    return (
        <View style={{ backgroundColor: '#ffff', flex: 1, marginBottom: 8, height: 10 }}>
            <ScrollView>

                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    render={({ errors, handleChange, values, handleSubmit }) => {
                        return (
                            <FormControl style={styles.FormControl}>
                                <Stack mx='4'>
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
                                    {errors.image && <Text style={{ fontSize: 10, color: 'red' }}>{errors.image}</Text>}
                                    <FormControl.Label>Title</FormControl.Label>
                                    <Input
                                        placeholder="e.g Toyota,Premio,Civic,Passo "
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                    />
                                    {errors.title && <Text style={{ fontSize: 10, color: 'red' }}>{errors.title}</Text>}
                                    <FormControl.Label>Description</FormControl.Label>
                                    <Input
                                        placeholder="Enter your Description"
                                        style={styles.DescriptionInput}
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                    />
                                    {errors.description && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
                                    )}
                                    <FormControl.Label>Manufacturer</FormControl.Label>
                                    <Select
                                        selectedValue={carType ?? ''}
                                        minWidth="200"
                                        accessibilityLabel="Category"
                                        placeholder="Manufacturer E.G Toyota, Honda Etc"
                                        _selectedItem={{
                                            bg: 'gray.300',
                                            endIcon: <CheckIcon size="4" />,
                                        }}
                                        mt={1}
                                        onValueChange={item => setCarType(item)}
                                    >
                                        {carsCategory.map(item => {
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
                                        placeholder="e.g 350,000, 5000,000, 1000,000 etc..."
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
                                        {carsEditing ? 'Update' : 'Sell Now'}
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