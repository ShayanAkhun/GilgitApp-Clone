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
    const [color, setColor] = useState(false)
    const [secondColor, setSecondColor] = useState(true)
    const [thirdColor, setThirdColor] = useState(false)
    const [fourthColor, setFourthColor] = useState(true)
    const [conditionColor, setConditionColor] = useState(false)
    const [secondConditionColor, setSecondconditionColor] = useState(true)
    const [productColor, setProductColor] = useState(false)
    const [secondProductColor, setsecondProductColor] = useState(true)


    const initialValues: UploadItem = {
        name: itemEditing && selectedItem ? selectedItem.name : '',
        price: itemEditing && selectedItem ? selectedItem.price : '',
        description: itemEditing && selectedItem ? selectedItem.description : '',
        location: itemEditing && selectedItem ? selectedItem.location : '',
        type: itemEditing && selectedItem ? selectedItem.type : '',
        id: itemEditing && selectedItem ? selectedItem.id : '',
        model: itemEditing && selectedItem ? selectedItem.model : '',
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
                model: values.model,
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
                manufacturer: values.manufacturer,
                model: values.model
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
    const toggleNewButton = () => {
        if (!secondColor) {
            setSecondColor(!secondColor)
            setColor(false)
        }
    }
    const toggleUsedButton = () => {
        if (!color) {
            setColor(!color)
            setSecondColor(false)
        }
    }
    const toggleFirstWarrntyButton = () => {
        if (!fourthColor) {
            setFourthColor(!fourthColor)
            setThirdColor(false)

        }
    }
    const toggleSecondWarrntyButton = () => {
        if (!thirdColor) {
            setThirdColor(!thirdColor)
            setFourthColor(false)
        }
    }
    const toggleConditionColor = () => {
        if (!secondConditionColor) {
            setSecondconditionColor(!secondConditionColor)
            setConditionColor(false)
        }
    }

    const toggleSecondConditionButton = () => {
        if (!conditionColor) {
            setConditionColor(!conditionColor)
            setSecondconditionColor(false)
        }
    }

    const toggleProductButton = () => {
        if (!secondProductColor) {
            setsecondProductColor(!secondProductColor)
            setProductColor(false)
        }
    }

    const togglesecondProdcutButton = () => {
        if (!productColor) {
            setProductColor(!productColor)
            setsecondProductColor(false)
        }
    }









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
                                    <Text style={styles.Negotation}>Negotiable</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 60, marginTop: 10 }}>

                                        <Button style={{
                                            backgroundColor: color ? '#ECECEC' : '#4285F4',
                                            borderRadius: 50,
                                            width: 100,
                                        }} onPress={toggleNewButton}>
                                            <Text style={{ color: color ? '#1C1C1C' : '#ffffff' }}>Yes</Text>
                                        </Button>

                                        <Button style={{
                                            backgroundColor: secondColor ? '#ECECEC' : '#4285F4',
                                            borderRadius: 50,
                                            width: 100,
                                        }}
                                            onPress={toggleUsedButton}>
                                            <Text style={{ color: secondColor ? '#1C1C1C' : '#ffffff' }}>No</Text>
                                        </Button>
                                    </View>
                                </View>


                                <Text style={styles.Warranty}>Available for Marcha</Text>
                                <View style={styles.toggleButtons}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 60, marginTop: 10 }}>
                                        <Button style={{
                                            backgroundColor: thirdColor ? '#ECECEC' : '#4285F4',
                                            borderRadius: 50,
                                            width: 100,
                                        }} onPress={toggleFirstWarrntyButton}>
                                            <Text style={{ color: thirdColor ? '#1C1C1C' : '#ffffff' }}>Yes</Text>
                                        </Button>

                                        <Button style={{
                                            backgroundColor: fourthColor ? '#ECECEC' : '#4285F4',
                                            borderRadius: 50,
                                            width: 100,
                                        }}
                                            onPress={toggleSecondWarrntyButton}>
                                            <Text style={{ color: fourthColor ? '#1C1C1C' : '#ffffff' }}>No</Text>
                                        </Button>
                                    </View>
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
                                            <Text style={styles.conditionText}>Condition</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 60, marginTop: 10 }}>

                                                <Button style={{
                                                    backgroundColor: conditionColor ? '#ECECEC' : '#4285F4',
                                                    borderRadius: 50,
                                                    width: 100,
                                                }} onPress={toggleConditionColor}>
                                                    <Text style={{ color: conditionColor ? '#1C1C1C' : '#ffffff' }}>Yes</Text>
                                                </Button>

                                                <Button style={{
                                                    backgroundColor: secondConditionColor ? '#ECECEC' : '#4285F4',
                                                    borderRadius: 50,
                                                    width: 100,
                                                }}
                                                    onPress={toggleSecondConditionButton}>
                                                    <Text style={{ color: secondConditionColor ? '#1C1C1C' : '#ffffff' }}>No</Text>
                                                </Button>
                                            </View>

                                            <Text style={styles.ProductText}>Product</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 60, marginTop: 10 }}>

                                                <Button style={{
                                                    backgroundColor: productColor ? '#ECECEC' : '#4285F4',
                                                    borderRadius: 50,
                                                    width: 100,
                                                }} onPress={toggleProductButton}>
                                                    <Text style={{ color: productColor ? '#1C1C1C' : '#ffffff' }}>Yes</Text>
                                                </Button>

                                                <Button style={{
                                                    backgroundColor: secondProductColor ? '#ECECEC' : '#4285F4',
                                                    borderRadius: 50,
                                                    width: 100,
                                                }}
                                                    onPress={togglesecondProdcutButton}>
                                                    <Text style={{ color: secondProductColor ? '#1C1C1C' : '#ffffff' }}>No</Text>
                                                </Button>
                                            </View>
                                            <View style={styles.ModelInput}>
                                                <FormControl.Label style={styles.ModelText}>Model</FormControl.Label>
                                                <Input
                                                    placeholder="Add Modeltype e.g.HP EliteBook,Dell Latitude..."
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
        height: 300,
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