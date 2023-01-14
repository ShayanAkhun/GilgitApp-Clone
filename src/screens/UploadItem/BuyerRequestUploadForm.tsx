import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Buyerstore } from '../../store'
import { UploadBuyerRequests, BuyerCategory } from '../../Types'
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

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('title is a required field'),
    price: Yup.string().required('This field is  required '),
    location: Yup.string().required('This field is  required'),
    description: Yup.string().required('This field should not be empty'),
})
export const BuyerRequestUploadForm = () => {
    const navigation = useNavigation();
    const brStoresEditing = Buyerstore(state => state.brStoresEditing)
    const selectedbrStores = Buyerstore(state => state.selectedbrStores)
    const buyerstore = Buyerstore(state => state.buyerstore)
    const setbrStores = Buyerstore(state => state.setbrStores)
    const [type, setType] = useState(brStoresEditing && selectedbrStores ? selectedbrStores.type : '')

    const initialValues: UploadBuyerRequests = {
        name: brStoresEditing && selectedbrStores ? selectedbrStores.name : '',
        price: brStoresEditing && selectedbrStores ? selectedbrStores.price : '',
        description: brStoresEditing && selectedbrStores ? selectedbrStores.description : '',
        location: brStoresEditing && selectedbrStores ? selectedbrStores.location : '',
        type: brStoresEditing && selectedbrStores ? selectedbrStores.type : '',
        id: brStoresEditing && selectedbrStores ? selectedbrStores.id : '',
    }

    const onSubmit = (values: UploadBuyerRequests,) => {
        const state = [...buyerstore]
        if (brStoresEditing && selectedbrStores) {
            console.log(values, 'is this working ');
            const updatedItems = {
                id: selectedbrStores.id,
                name: values.name,
                price: values.price,
                description: values.description,
                location: values.location,
                manufacturer: values.manufacturer,
                // itemType,
            }
            const itemIndex = state.findIndex(i => i.id === selectedbrStores.id);
            state[itemIndex] = updatedItems;
        } else {
            state.push({
                id: Math.floor(Math.random() * 100),
                name: values.name,
                price: values.price,
                description: values.description,
                location: values.location,
                manufacturer: values.manufacturer
            })
        }
        setbrStores(state);
        navigation.goBack();
    }
    const buyerCategory = (Object?.keys(BuyerCategory) as (keyof typeof BuyerCategory)[])?.map(key => {
        return BuyerCategory[key];
    });
    return (
        <View style={{ backgroundColor: '#FFFFFF' }}>
            <ScrollView>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    render={({ errors, handleChange, values, handleSubmit }) => {
                        return (
                            <FormControl style={styles.FormControl}>
                                <Stack mx='4'>
                                    <FormControl.Label>What are you looking for? </FormControl.Label>
                                    <Input
                                        placeholder="I am looking for "
                                        style={styles.DescriptionInput}
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                    />
                                    {errors.name && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                                    )}
                                    <FormControl.Label>Category </FormControl.Label>
                                    <Select
                                        selectedValue={type ?? ''}
                                        minWidth="200"
                                        accessibilityLabel="Category"
                                        placeholder="Category"
                                        _selectedItem={{
                                            bg: 'gray.300',
                                            endIcon: <CheckIcon size="4" />,
                                        }}
                                        mt={1}
                                        onValueChange={item => setType(item)}
                                    >
                                        {buyerCategory.map(item => {
                                            return <Select.Item label={item} value={item} />;
                                        })}
                                    </Select>
                                    {errors.description && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
                                    )}
                                    <FormControl.Label>Price</FormControl.Label>
                                    <Input
                                        placeholder="12,000"
                                        value={values.manufacturer}
                                        onChangeText={handleChange('price')}
                                        keyboardType={'numeric'}
                                    />
                                    {errors.price && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.price}</Text>
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
                                    <Button style={styles.SellButton} onPress={() => handleSubmit()}>
                                        {brStoresEditing ? 'Update' : 'Sell Now'}
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


    }

})