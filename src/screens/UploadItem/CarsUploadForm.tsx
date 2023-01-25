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
const { width } = Dimensions.get('window')
const height = Dimensions.get('window').height;
import * as  ImagePicker from 'react-native-image-picker';
import MIcon from 'react-native-vector-icons/MaterialIcons';

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
    const [color, setColor] = useState(false)
    const [secondColor, setSecondColor] = useState(true)
    const [thirdColor, setThirdColor] = useState(false)
    const [fourthColor, setFourthColor] = useState(true)
    const [conditionColor, setConditionColor] = useState(false)
    const [secondConditionColor, setSecondconditionColor] = useState(true)
    const [productColor, setProductColor] = useState(false)
    const [secondProductColor, setsecondProductColor] = useState(true)

    const initialValues: Cars = {
        title: carsEditing && selectedCars ? selectedCars.title : '',
        price: carsEditing && selectedCars ? selectedCars.price : '',
        description: carsEditing && selectedCars ? selectedCars.description : '',
        location: carsEditing && selectedCars ? selectedCars.location : '',
        type: carsEditing && selectedCars ? selectedCars.type : '',
        id: carsEditing && selectedCars ? selectedCars.id : '',
        manufacturer: carsEditing && selectedCars ? selectedCars.manufacturer : '',
        engine: carsEditing && selectedCars ? selectedCars.engine : '',
        modelYear: carsEditing && selectedCars ? selectedCars.modelYear : '',
        city: carsEditing && selectedCars ? selectedCars.city : '',
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
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            console.log('Images')
        })
    }
    const carsCategory = (Object?.keys(CarsCategory) as (keyof typeof CarsCategory)[])?.map(key => {
        return CarsCategory[key];
    });
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
                    render={({ errors, handleChange, values, handleSubmit }) => {
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
                                    <Text style={styles.Negotation}>Condition</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 60, marginTop: 10 }}>

                                        <Button style={{
                                            backgroundColor: color ? '#ECECEC' : '#4285F4',
                                            borderRadius: 50,
                                            width: 100,
                                        }} onPress={toggleNewButton}>
                                            <Text style={{ color: color ? '#1C1C1C' : '#ffffff' }}>New</Text>
                                        </Button>

                                        <Button style={{
                                            backgroundColor: secondColor ? '#ECECEC' : '#4285F4',
                                            borderRadius: 50,
                                            width: 100,
                                        }}
                                            onPress={toggleUsedButton}>
                                            <Text style={{ color: secondColor ? '#1C1C1C' : '#ffffff' }}>Used</Text>
                                        </Button>
                                    </View>
                                </View>
                                <Text style={styles.Warranty}>Warranty</Text>
                                <View style={styles.toggleButtons}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', right: 60, marginTop: 10 }}>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'space-between', }}>
                                            <Button style={{
                                                backgroundColor: thirdColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }} onPress={toggleFirstWarrntyButton}>
                                                <Text style={{ color: thirdColor ? '#1C1C1C' : '#ffffff' }}>7Days</Text>
                                            </Button>

                                            <Button style={{
                                                backgroundColor: fourthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }}
                                                onPress={toggleSecondWarrntyButton}>
                                                <Text style={{ color: fourthColor ? '#1C1C1C' : '#ffffff' }}>15 Days</Text>
                                            </Button>
                                            <Button style={{
                                                backgroundColor: fourthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }}
                                                onPress={toggleSecondWarrntyButton}>
                                                <Text style={{ color: fourthColor ? '#1C1C1C' : '#ffffff' }}>30 Days</Text>
                                            </Button>
                                            <Button style={{
                                                backgroundColor: fourthColor ? '#ECECEC' : '#4285F4',
                                                borderRadius: 50,
                                                width: 100,
                                            }}
                                                onPress={toggleSecondWarrntyButton}>
                                                <Text style={{ color: fourthColor ? '#1C1C1C' : '#ffffff' }}>No Warranty</Text>
                                            </Button>
                                        </ScrollView>
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
                                            <Text style={styles.conditionText}>Negotiable</Text>
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

                                            <Text style={styles.ProductText}>Availabe for March</Text>
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


    },
    toggleButtons: {
        marginVertical: 18,
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