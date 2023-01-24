import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { BikesStore } from '../../store/BIkesStore';
import { Bikes, BikesCategory } from '../../Types'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Input,
    FormControl,
    Stack,
    Button,
    AddIcon,
    Select,
    CheckIcon
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window')
import * as  ImagePicker from 'react-native-image-picker';

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is a required field'),
    price: Yup.string().required('This field is  required '),
    location: Yup.string().required('This field is  required'),
    description: Yup.string().required('This field should not be empty'),
    title: Yup.string().required('title is a required field'),
})
export const BikesUploadForm = () => {
    const navigation = useNavigation();
    const bikesEditing = BikesStore(state => state.bikesEditing)
    const selectedBikes = BikesStore(state => state.selectedBikes)
    const bikes = BikesStore(state => state.bikes)
    const setBikes = BikesStore(state => state.setBikes)
    const [type, setType] = useState(bikesEditing && selectedBikes ? selectedBikes.type : '')
    const [color, setColor] = useState(true)
    const [secondColor, setSecondColor] = useState(true)
    const [thirdColor, setThirdColor] = useState(true)
    const [fourthColor, setFourthColor] = useState(true)
    const [fifthColor, setFifthColor] = useState(true)
    const [sixthColor, setSixthColor] = useState(true)

    const initialValues: Bikes = {
        price: bikesEditing && selectedBikes ? selectedBikes.price : '',
        description: bikesEditing && selectedBikes ? selectedBikes.description : '',
        location: bikesEditing && selectedBikes ? selectedBikes.location : '',
        type: bikesEditing && selectedBikes ? selectedBikes.type : '',
        id: bikesEditing && selectedBikes ? selectedBikes.id : '',
        title: bikesEditing && selectedBikes ? selectedBikes.title : '',
    }

    const onSubmit = (values: Bikes,) => {
        const state = [...bikes]
        if (bikesEditing && selectedBikes) {
            const updatedItems = {
                id: selectedBikes.id,
                price: values.price,
                description: values.description,
                location: values.location,
                manufacturer: values.manufacturer,
                title: values.title
            }
            const itemIndex = state.findIndex(i => i.id === selectedBikes.id);
            state[itemIndex] = updatedItems;
        } else {
            state.push({
                id: Math.floor(Math.random() * 100),
                price: values.price,
                description: values.description,
                location: values.location,
                manufacturer: values.manufacturer,
                title: values.title
            })
        }
        setBikes(state);
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
    const bikesCategory = (Object?.keys(BikesCategory) as (keyof typeof BikesCategory)[])?.map(key => {
        return BikesCategory[key];
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
                                    <View style={{ backgroundColor: '#ffff', top: 40, }}>
                                        <View style={styles.Addphoto}>
                                            <TouchableOpacity onPress={handleImageUpload}>
                                                <Text style={{ alignSelf: 'center', fontSize: 16, marginTop: 2, color: 'gray.500' }} >
                                                    Add Photo
                                                </Text>
                                                <View style={{ alignSelf: 'center' }}>
                                                    <AddIcon size={6} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
                                        {bikesEditing ? 'Update' : 'Sell Now'}
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
        marginTop: 20,
        width: 380


    },
    Addphoto: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginTop: 50,
        borderWidth: 1,
        borderColor: 'gray.300',
        height: 150,
        width: 150,
        bottom: 40,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 150
    },

})