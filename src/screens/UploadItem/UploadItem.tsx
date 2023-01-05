import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { UploadItem } from '../../Types';
import { uploadItemStore } from '../../store';
import {
    Input,
    FormControl,
    Stack,
    Select,
    CheckIcon,
    Button,
    AddIcon,
    Pressable
} from 'native-base';


const validationSchema = Yup.object().shape({
    title: Yup.string().required('Enter Item Name'),
    price: Yup.string().required('Price'),
    category: Yup.string().required('Category'),
    location: Yup.string().required('Enter your Location')
})
export const UploadItems = () => {
    const navigation = useNavigation();
    const itemEditing = uploadItemStore(state => state.itemEditing)
    const selectedItem = uploadItemStore(state => state.selectedItem)
    const item = uploadItemStore(state => state.item)
    const setItem = uploadItemStore(state => state.setItem)
    const [itemType, setItemType] = useState(itemEditing && selectedItem ? selectedItem.type : '')

    const initialValues: UploadItem = {
        title: itemEditing && selectedItem ? selectedItem.title : '',
        price: itemEditing && selectedItem ? selectedItem.price : '',
        category: itemEditing && selectedItem ? selectedItem.category : '',
        location: itemEditing && selectedItem ? selectedItem.location : '',
        type: itemEditing && selectedItem ? selectedItem.type : '',
        id: itemEditing && selectedItem ? selectedItem.id : '',
    }

    const onSubmit = (values: UploadItem) => {
        const itemState = [...item]
        if (itemEditing && selectedItem) {
            console.log(values, 'is this working ');
            const updatedItems = {
                id: selectedItem.id,
                title: values.title,
                price: values.price,
                category: values.category,
                location: values.category,
                itemType,
            }
            const itemIndex = itemState.findIndex(i => i.id === selectedItem.id);
            itemState[itemIndex] = updatedItems;
        } else {
            itemState.push({
                id: Math.floor(Math.random() * 100),
                title: values.title,
                price: values.price,
                category: values.category,
                location: values.category,
                // itemType
            })
        }
        setItem(itemState);
        navigation.goBack();
    }



    return (
        <ScrollView style={{ backgroundColor: '#ffff', flex: 1 }}>

            <View>

                <View style={{ backgroundColor: '#ffff', }}>
                    <View style={styles.Addphoto}>
                        <TouchableOpacity>
                            <View style={{ alignSelf: 'center' }}>
                                <AddIcon size={6} />
                            </View>
                            <Text style={{ alignSelf: 'center', fontSize: 14, marginTop: 6, color: 'gray.500' }} >
                                Click here to upload a Picture
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    Addphoto: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginTop: 50,
        // borderWidth: 1,
        borderColor: 'gray.300',
        height: 150,
        width: 200,
        bottom: 40,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        // borderRadius: 150,
    },
})