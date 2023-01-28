import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { BikesStore } from '../../store/BIkesStore';
import { Bikes, BikesCategory } from '../../Types'
import { Formik, Form, Field } from 'formik';

import {
    Input,
    FormControl,
    Stack,
    Button,
    AddIcon,
    Select,
    CheckIcon
} from 'native-base';
import { initialValues } from '../../components/Helpers/BIkesHelpers';
import { validationSchema } from '../../components/Helpers/BIkesHelpers';
import { onSubmit } from '../../components/Helpers/BIkesHelpers';
import * as  ImagePicker from 'react-native-image-picker';
import { GlobalButton } from '../../components/LoginButtons/FormButtons';
import { CameraOptions } from 'react-native-image-picker';
import MIcon from 'react-native-vector-icons/MaterialIcons';


export const BikesUploadForm = () => {
    const bikesEditing = BikesStore(state => state.bikesEditing)
    const selectedBikes = BikesStore(state => state.selectedBikes)
    const [type, setType] = useState(bikesEditing && selectedBikes ? selectedBikes.type : '')
    const [isClicked, setIsClicked] = useState(false)

    const dropDownHandler = () => {
        setIsClicked(!isClicked)
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
    const bikesCategory = (Object?.keys(BikesCategory) as (keyof typeof BikesCategory)[])?.map(key => {
        return BikesCategory[key];
    });
    return (
        <View style={{ backgroundColor: '#ffff', flex: 1, }}>
            <ScrollView>
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
                                        placeholder="e.g Honda 125, Unique 70 etc. "
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                    />
                                    {errors.title && <Text style={{ fontSize: 10, color: 'red' }}>{errors.title}</Text>}
                                    <FormControl.Label>Description</FormControl.Label>
                                    <Input
                                        placeholder="Add some Description"
                                        style={styles.DescriptionInput}
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                    />
                                    {errors.description && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
                                    )}
                                    <FormControl.Label>Manufacturer</FormControl.Label>
                                    <Select
                                        selectedValue={type ?? ''}
                                        minWidth="200"
                                        accessibilityLabel="Category"
                                        placeholder="Manufacturer E.G Honda, UNique, Yamaha Etc"
                                        _selectedItem={{
                                            bg: 'gray.300',
                                            endIcon: <CheckIcon size="4" />,
                                        }}
                                        mt={1}
                                        onValueChange={item => setType(item)}
                                    >
                                        {bikesCategory.map(item => {
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
                                        placeholder="e.g 50,000, 100,000 etc..."
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
                                                }} isActive={values.negotation} />
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
                                                <FormControl.Label style={styles.ModelText}>Model Year</FormControl.Label>
                                                <Input
                                                    placeholder="Model Year e.g. 2005, 2012 etc.."
                                                    value={values.model}
                                                    onChangeText={handleChange('Model Year')}
                                                    mx='2'
                                                />
                                                <FormControl.Label style={styles.ModelText}>Engine</FormControl.Label>
                                                <Input
                                                    placeholder="Bike power e.g.cd125, delux100, cd70 etc.."
                                                    value={values.engine}
                                                    onChangeText={handleChange('Engine')}
                                                    mx='2'
                                                />
                                                <FormControl.Label style={styles.ModelText}>Bike Color</FormControl.Label>
                                                <Input
                                                    placeholder="Color of your Bike ?"
                                                    value={values.bikeColor}
                                                    onChangeText={handleChange('Bike Color')}
                                                    mx='2'
                                                />
                                                <FormControl.Label style={styles.ModelText}>Registered City</FormControl.Label>
                                                <Input
                                                    placeholder="City name where the Bike is registered"
                                                    value={values.registeredCity}
                                                    onChangeText={handleChange('Registered City')}
                                                    mx='2'
                                                />
                                                <FormControl.Label style={styles.ModelText}>Milage (Meter Reading)</FormControl.Label>
                                                <Input
                                                    placeholder="e.g. 100, 2000 KM"
                                                    value={values.milage}
                                                    onChangeText={handleChange('Milage (Meter Reading)')}
                                                    mx='2'
                                                />
                                            </View>
                                        </View>

                                    </View>) : null}
                                </View>



                                <View style={{ alignSelf: 'center', padding: 10 }}>
                                    <Button style={styles.SellButton} onPress={() => handleSubmit()}>
                                        {bikesEditing ? 'Update' : 'Sell Now'}
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
        marginVertical: 4,
        marginHorizontal: 8,

    },
    SellButton: {
        backgroundColor: '#4285F4',
        marginTop: 20,
        width: 380


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
    Condition: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '500',
        marginVertical: 4,
        marginHorizontal: 8,

    },
    toggleButtons: {
        marginVertical: 18,
    },
    MemoryText: {
        color: '#1C1C1C',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins',
        marginVertical: 4,
        marginHorizontal: 8,
        marginTop: 8,
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
    ProductText: {
        color: '#1C1C1C',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins',
        marginVertical: 4,
        marginHorizontal: 8,
        marginTop: 8,
    },
    dropDownArea: {
        width: "100%",
        height: 600,
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
})