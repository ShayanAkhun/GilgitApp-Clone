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
import GlobalButton from '../../components/LoginButtons/FormButtons';
import * as  ImagePicker from 'react-native-image-picker';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { CameraOptions } from 'react-native-image-picker';
import { initialValues } from '../../components/Helpers/CarsHelpers';
import { validationSchema } from '../../components/Helpers/CarsHelpers';

export const CarsUploadItems = () => {
    const navigation = useNavigation();
    const carsEditing = CarsStore(state => state.carsEditing)
    const selectedCars = CarsStore(state => state.selectedCars)
    const cars = CarsStore(state => state.cars)
    const setItem = CarsStore(state => state.setCars)
    const [carType, setCarType] = useState(carsEditing && selectedCars ? selectedCars.type : '')

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
                engine: values.engine,
                modelYear: values.modelYear,
                city: values.city,

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
                engine: values.engine,
                modelYear: values.modelYear,
                city: values.city,

            })
        }
        setItem(carsState);
        navigation.goBack();

    }
    const handleImageUpload = () => {
        const options: CameraOptions = {
            mediaType: "photo"
        }
        ImagePicker.launchCamera(options, response => {
            console.log('Images')
        })
        ImagePicker.launchImageLibrary(options, response => {
            console.log('Images')
        })
    }
    const carsCategory = (Object?.keys(CarsCategory) as (keyof typeof CarsCategory)[])?.map(key => {
        return CarsCategory[key];
    });
    const [isClicked, setIsClicked] = useState(false)

    const dropDownHandler = () => {
        setIsClicked(!isClicked)
    }
    return (
        <View style={{ backgroundColor: '#ffff', flex: 1, }}>
            <ScrollView style={styles.container}>
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
                    render={({ errors, handleChange, values, handleSubmit, setFieldValue }) => {
                        return (
                            <FormControl style={styles.FormControl}>
                                <Stack mx='4'>

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
                                </Stack>
                                <View style={{ top: 10 }}>
                                    <Text style={styles.Condition}>Condition</Text>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 80, right: 60, marginTop: 10 }}>

                                        <GlobalButton name={'New'} text="New" onPress={() => {
                                            setFieldValue("condition", "New")
                                        }} isActive={values.condition} />
                                        <GlobalButton text="Used" name={'Used'} onPress={() => {
                                            setFieldValue("condition", "Used")

                                        }} isActive={values.condition} />
                                    </View>
                                </View>
                                <Text style={styles.Warranty}>Warranty</Text>
                                <View style={styles.toggleButtons}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                        <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20 }}>

                                            <GlobalButton text="7 Days" name='7 Days' isActive={values.warranty} onPress={() => {
                                                setFieldValue("warranty", "7 Days")
                                            }} />

                                            <GlobalButton text="15 Days" name='15 Days' isActive={values.warranty} onPress={() => {
                                                setFieldValue("warranty", "15 Days")

                                            }} />
                                            <GlobalButton text="30 Days" name='30 Days' isActive={values.warranty} onPress={() => {
                                                setFieldValue("warranty", "30 Days")

                                            }} />
                                            <GlobalButton text="No Warranty" name='No Warranty' isActive={values.warranty} onPress={() => {
                                                setFieldValue("warranty", "No Warranty")

                                            }} />
                                        </View>
                                    </ScrollView>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={dropDownHandler}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#4285F4', fontFamily: 'Poppins-Light', fontSize: 17, letterSpacing: 1, fontWeight: '500', marginHorizontal: 8, }}>
                                                Additional Information
                                            </Text>
                                            {isClicked ? (<MIcon name='keyboard-arrow-up' size={32} />) :
                                                (<MIcon name='keyboard-arrow-down' size={32} />)}
                                        </View>
                                    </TouchableOpacity>
                                    {isClicked ? (<View style={styles.dropDownArea}>
                                        <View>
                                            <Text style={styles.conditionText}>Negotiable</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20 }}>

                                                <GlobalButton name={'Yes'} text="Yes" onPress={() => {
                                                    setFieldValue("negotation", "Yes")
                                                }} isActive={values.negotation} />
                                                <GlobalButton name={'No'} text="No" onPress={() => {
                                                    setFieldValue("negotation", "No")
                                                }} isActive={values.condition} />
                                            </View>
                                            <Text style={styles.ProductText}>Available for March</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20 }}>

                                                <GlobalButton name={'Yes'} text="Yes" onPress={() => {
                                                    setFieldValue("marcha", "Yes")
                                                }} isActive={values.marcha} />
                                                <GlobalButton name={'No'} text="No" onPress={() => {
                                                    setFieldValue("marcha", "No")
                                                }} isActive={values.marcha} />
                                            </View>
                                            <View style={styles.ModelInput}>
                                                <FormControl.Label style={styles.ModelText}>Engine</FormControl.Label>
                                                <Input
                                                    placeholder="Engine power e.g 1500cc, 1.8cc ect.. "
                                                    value={values.engine}
                                                    onChangeText={handleChange('Model')}
                                                    keyboardType='numeric'
                                                    mx='2'
                                                />
                                                <FormControl.Label style={styles.ModelText}>Model Year</FormControl.Label>
                                                <Input
                                                    placeholder="Enter Model Year e.g 2010, 2016 etc... "
                                                    value={values.engine}
                                                    onChangeText={handleChange('Engine')}
                                                    mx='2'
                                                    keyboardType='numeric'
                                                />
                                                <FormControl.Label style={styles.ModelText}>Registered City</FormControl.Label>
                                                <Input
                                                    placeholder="City name where the vehicle is registered"
                                                    value={values.city}
                                                    onChangeText={handleChange('City')}
                                                    mx='2'

                                                />
                                            </View>
                                            <Text style={styles.Warranty}>Fuel</Text>
                                            <View style={styles.toggleButtons}>
                                                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                                    <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20 }}>

                                                        <GlobalButton text="Petrol" name='Petrol' isActive={values.fuel} onPress={() => {
                                                            setFieldValue("fuel", "Petrol")
                                                        }} />

                                                        <GlobalButton text="Diesel" name='Diesel' isActive={values.fuel} onPress={() => {
                                                            setFieldValue("fuel", "Diesel")

                                                        }} />
                                                        <GlobalButton text="Hybrid" name='Hybrid' isActive={values.fuel} onPress={() => {
                                                            setFieldValue("fuel", "Hybrid")

                                                        }} />
                                                        <GlobalButton text="CNG" name='CNG' isActive={values.fuel} onPress={() => {
                                                            setFieldValue("fuel", "CNG")

                                                        }} />
                                                    </View>
                                                </ScrollView>
                                            </View>
                                            <View>
                                                <Text style={styles.Condition}>Transmission</Text>
                                                <View style={{ flexDirection: 'row', marginHorizontal: 80, right: 60, marginTop: 10 }}>

                                                    <GlobalButton name={'Auto'} text="Auto" onPress={() => {
                                                        setFieldValue("transmission", "Auto")
                                                    }} isActive={values.transmission} />
                                                    <GlobalButton text="Manual" name={'Manual'} onPress={() => {
                                                        setFieldValue("transmission", "Manual")

                                                    }} isActive={values.transmission} />
                                                </View>
                                            </View>

                                            <FormControl.Label style={styles.ModelText}>Milage (Meter Reading)</FormControl.Label>
                                            <Input
                                                placeholder="e.g. 1000 KM, 20000 KM"
                                                value={values.milage}
                                                onChangeText={handleChange('Milage')}
                                                mx='2'

                                            />
                                        </View>

                                    </View>) : null}
                                </View>
                                <View style={{ alignSelf: 'center', padding: 10 }}>
                                    <Button style={styles.SellButton} onPress={() => handleSubmit()}>
                                        {carsEditing ? 'Update' : 'Sell Now'}
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
    container: {
        backgroundColor: '#FFFFFF'
    },
    Addphoto: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'gray.300',
        height: 150,
        width: 150,
        bottom: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 150
    },
    FormControl: {
        width: '100%',
        height: '100%'
    },
    DescriptionInput: {
        width: 380,
        height: 100,
        textAlignVertical: 'top'
    },
    Condition: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '500',
        marginVertical: 4,
        marginHorizontal: 8,

    },
    Warranty: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '500',
        top: 28,
        marginVertical: 4,
        marginHorizontal: 8,

    },
    SellButton: {
        backgroundColor: '#4285F4',
        width: 360,
    },
    toggleButtons: {
        marginVertical: 18,
    },
    dropDownArea: {
        width: "100%",
        height: 750,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#ffff',
        alignSelf: 'center'
    },
    conditionText: {
        color: '#1C1C1C',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins',
        marginVertical: 4,
        marginHorizontal: 8,
    },
    ProductText: {
        color: '#1C1C1C',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins',
        marginVertical: 4,
        marginHorizontal: 8,
        marginTop: 8
    },
    ModelText: {
        lineHeight: 24,
        fontFamily: 'Poppins',
        marginVertical: 4,
        marginHorizontal: 8,
        marginTop: 8
    },
    ModelInput: {
        marginTop: 20
    }

})