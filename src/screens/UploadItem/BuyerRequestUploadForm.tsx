import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Buyerstore } from '../../store'
import { BuyerCategory } from '../../Types'
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
import MIcon from 'react-native-vector-icons/MaterialIcons';


const Data = [
    { Data: "Cars" },
    { Data: 'Bikes' },
    { Data: "Laptops" },
    { Data: "Mobiles" },
    { Data: "Pets" },
    { Data: "Home" },
    { Data: "Appliances" },
    { Data: "Plots" },
    { Data: "Shops" },
    { Data: "Offices" },
    { Data: "Furniture" },
    { Data: "Fashions" },
    { Data: "Dry Fruits" },
    { Data: "Others" }
]

export const BuyerRequestUploadForm = () => {
    const brStoresEditing = Buyerstore(state => state.brStoresEditing)
    const [isClicked, setIsClicked] = useState(false)
    const [category, setCategory] = useState('Category')
    const [data, setData] = useState(Data)

    const dropDownHandler = () => {
        setIsClicked(!isClicked)
    }


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
                                    <View>
                                        <TouchableOpacity onPress={dropDownHandler} style={styles.dropdownSelector}>
                                            <Text style={styles.dropDownText}>
                                                {category}
                                            </Text>
                                            {isClicked ? (<MIcon name='keyboard-arrow-up' size={32} />) :
                                                (<MIcon name='keyboard-arrow-down' size={32} />)}
                                        </TouchableOpacity>
                                        {isClicked ? (
                                            <View style={styles.dropDownArea}>
                                                <FlatList data={data} renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity style={styles.DATAitems} onPress={() => {
                                                            setCategory(item.Data)
                                                            setIsClicked(false)
                                                        }}>
                                                            <Text>{item.Data}</Text>
                                                        </TouchableOpacity>
                                                    )

                                                }} />
                                            </View>) : null}
                                    </View>
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


    },
    dropDownArea: {
        width: "100%",
        height: 300,
        borderRadius: 2,
        marginTop: 10,
        backgroundColor: '#ffff',
        alignSelf: 'center',
        elevation: 4
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
    }

})