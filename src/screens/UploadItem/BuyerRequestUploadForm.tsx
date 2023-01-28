import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Buyerstore } from '../../store'
import { UploadBuyerRequests, BuyerCategory } from '../../Types'
import { Formik, } from 'formik';

import {
    Input,
    FormControl,
    Stack,
    Button,
    Select,
    CheckIcon
} from 'native-base';
import { initialValues } from '../../components/Helpers/BRHelpers';
import { validationSchema } from '../../components/Helpers/BRHelpers';
import { onSubmit } from '../../components/Helpers/BRHelpers';


export const BuyerRequestUploadForm = () => {
    const brStoresEditing = Buyerstore(state => state.brStoresEditing)
    const selectedbrStores = Buyerstore(state => state.selectedbrStores)
    const [type, setType] = useState(brStoresEditing && selectedbrStores ? selectedbrStores.type : '')




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
                                        {brStoresEditing ? 'Post a Request' : 'Post a Request'}
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