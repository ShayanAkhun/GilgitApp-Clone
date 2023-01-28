import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, FlatList } from 'react-native'
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
import { GlobalButton } from '../../components/LoginButtons/FormButtons';
import * as  ImagePicker from 'react-native-image-picker';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { CameraOptions } from 'react-native-image-picker';
import { initialValues } from '../../components/Helpers/CarsHelpers';
import { validationSchema } from '../../components/Helpers/CarsHelpers';
import { onSubmit } from '../../components/Helpers/CarsHelpers';


const Data = [
    { Data: "Toyota" },
    { Data: 'Honda' },
    { Data: "Nissan" },
    { Data: "Hyundai" },
    { Data: "Suzuki" },
    { Data: "Jeep" },
    { Data: "Mazda" },
    { Data: "Ford" },
    { Data: "Mitsubishi" },
    { Data: "Audi" },
    { Data: "Others" },
]
export const CarsUploadItems = () => {
    const carsEditing = CarsStore(state => state.carsEditing)


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
    const [isClicked, setIsClicked] = useState(false)
    const [isDropDownClicked, setisDropDownClicked] = useState(false)
    const [cars, setCars] = useState('Manufacturer')
    const [data, setData] = useState(Data)

    const dropDownHandler = () => {
        setIsClicked(!isClicked)
    }
    const dropownHandler = () => {
        setisDropDownClicked(!isDropDownClicked)
    }


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: '#ffff', flex: 1, }}>
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
                                    <View>
                                        <TouchableOpacity onPress={dropownHandler} style={styles.dropdownSelector}>
                                            <Text style={styles.dropDownText}>
                                                {cars}
                                            </Text>
                                            {isDropDownClicked ? (<MIcon name='keyboard-arrow-up' size={32} />) :
                                                (<MIcon name='keyboard-arrow-down' size={32} />)}
                                        </TouchableOpacity>
                                        {isDropDownClicked ? (
                                            <View style={styles.dropDown}>
                                                <FlatList
                                                    data={data}
                                                    showsVerticalScrollIndicator={false}
                                                    renderItem={({ item, index }) => {
                                                        return (
                                                            <TouchableOpacity style={styles.DATAitems} onPress={() => {
                                                                setCars(item.Data)
                                                                setisDropDownClicked(false)
                                                            }}>
                                                                <Text>{item.Data}</Text>
                                                            </TouchableOpacity>
                                                        )

                                                    }} />
                                            </View>) : null}
                                    </View>
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

            </View>
        </ScrollView>


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
        alignSelf: 'center'
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
    },
    dropdownSelector: {
        width: '100%',
        height: 50,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropDownText: {
        color: '#1C1C1C',
        fontFamily: 'Poppins-Light',
        fontSize: 13,
        letterSpacing: 1,
        fontWeight: '500',
        marginHorizontal: 8,
        textAlign: 'center'
    },
    DATAitems: {
        width: '85%',
        height: 50,
        borderBottomWidth: 0.2,
        borderBottomColor: '#8e8e8e',
        alignSelf: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins'
    },
    dropDown: {
        width: "100%",
        height: 400,
        borderRadius: 2,
        marginTop: 10,
        backgroundColor: '#ffff',
        alignSelf: 'center',
        elevation: 4
    }

})



