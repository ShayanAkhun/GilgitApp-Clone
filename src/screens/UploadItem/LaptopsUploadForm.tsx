import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { Formik, } from 'formik';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { LaptopsCategory } from '../../Types';
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
import { initialValues } from '../../components/Helpers/LaptopsHelper';
import { validationSchema } from '../../components/Helpers/LaptopsHelper';
import { onSubmit } from '../../components/Helpers/LaptopsHelper';
import { GlobalButton } from '../../components/LoginButtons/FormButtons';
import { CameraOptions } from 'react-native-image-picker';

export const LaptopsUploadItems = () => {
    const itemEditing = uploadItemStore(state => state.itemEditing)
    const selectedItem = uploadItemStore(state => state.selectedItem)
    const [itemType, setItemType] = useState(itemEditing && selectedItem ? selectedItem.type : '')



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

    const laptops = (Object?.keys(LaptopsCategory) as (keyof typeof LaptopsCategory)[])?.map(key => {
        return LaptopsCategory[key]
    })

    const [isClicked, setIsClicked] = useState(false)

    const dropDownHandler = () => {
        setIsClicked(!isClicked)
    }

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
                    render={({ errors, handleChange, values, handleSubmit, setFieldValue }) => {
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
                                                    setFieldValue("negotiable", "Yes")
                                                }} isActive={values.negotiable} />
                                                <GlobalButton name={'No'} text="No" onPress={() => {
                                                    setFieldValue("negotiable", "No")
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
                                            <Text style={styles.conditionText}>Product</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20 }}>

                                                <GlobalButton name={'Mobile'} text="Mobile" onPress={() => {
                                                    setFieldValue("product", "Mobile")
                                                }} isActive={values.product} />
                                                <GlobalButton name={'Tablet'} text="Tablet" onPress={() => {
                                                    setFieldValue("product", "Tablet")
                                                }} isActive={values.product} />
                                                <GlobalButton name={'Accessory'} text="Accessory" onPress={() => {
                                                    setFieldValue("product", "Accessory")
                                                }} isActive={values.product} />
                                            </View>
                                            <Text style={styles.ProductText}>Ram</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20 }}>
                                                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                                    <GlobalButton name={'2Gb'} text="2Gb" onPress={() => {
                                                        setFieldValue("ram", "2Gb")
                                                    }} isActive={values.ram} />
                                                    <GlobalButton name={'4Gb'} text="4Gb" onPress={() => {
                                                        setFieldValue("ram", "4Gb")
                                                    }} isActive={values.ram} />
                                                    <GlobalButton name={'6Gb'} text="6Gb" onPress={() => {
                                                        setFieldValue("ram", "6Gb")
                                                    }} isActive={values.ram} />
                                                    <GlobalButton name={'8Gb'} text="8Gb" onPress={() => {
                                                        setFieldValue("ram", "8Gb")
                                                    }} isActive={values.ram} />
                                                    <GlobalButton name={'16Gb'} text="16Gb" onPress={() => {
                                                        setFieldValue("ram", "16Gb")
                                                    }} isActive={values.ram} />
                                                    <GlobalButton name={'32Gb'} text="32Gb" onPress={() => {
                                                        setFieldValue("ram", "32Gb")
                                                    }} isActive={values.ram} />
                                                    <GlobalButton name={'64Gb'} text="64Gb" onPress={() => {
                                                        setFieldValue("ram", "64Gb")
                                                    }} isActive={values.ram} />
                                                </ScrollView>
                                            </View>
                                            <Text style={styles.MemoryText}>Memory</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20 }}>
                                                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                                    <GlobalButton name={'32Gb'} text="32Gb" onPress={() => {
                                                        setFieldValue("memory", "32Gb")
                                                    }} isActive={values.memory} />
                                                    <GlobalButton name={'64Gb'} text="64Gb" onPress={() => {
                                                        setFieldValue("memory", "64Gb")
                                                    }} isActive={values.memory} />
                                                    <GlobalButton name={'128Gb'} text="128Gb" onPress={() => {
                                                        setFieldValue("memory", "128Gb")
                                                    }} isActive={values.memory} />
                                                    <GlobalButton name={'256Gb'} text="256Gb" onPress={() => {
                                                        setFieldValue("memory", "256Gb")
                                                    }} isActive={values.memory} />
                                                    <GlobalButton name={'512Gb'} text="512Gb" onPress={() => {
                                                        setFieldValue("memory", "512Gb")
                                                    }} isActive={values.memory} />
                                                    <GlobalButton name={'1TB'} text="1TB" onPress={() => {
                                                        setFieldValue("memory", "1TB")
                                                    }} isActive={values.memory} />
                                                </ScrollView>
                                            </View>
                                            <View style={styles.ModelInput}>
                                                <FormControl.Label style={styles.ModelText}>Model</FormControl.Label>
                                                <Input
                                                    placeholder="Add Modeltype e.g.S5, 11 Promax etc..."
                                                    value={values.location}
                                                    onChangeText={handleChange('Model')}
                                                    mx='2'
                                                />
                                            </View>
                                        </View>

                                    </View>) : null}
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
        </View >


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
        marginVertical: 4,
        marginHorizontal: 8,
        fontFamily: 'Poppins'

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
        height: 560,
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
        marginTop: 8,
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
    Condition: {
        fontSize: 16,
        color: '#1C1C1C',
        fontWeight: '500',
        marginVertical: 4,
        marginHorizontal: 8,

    },

})