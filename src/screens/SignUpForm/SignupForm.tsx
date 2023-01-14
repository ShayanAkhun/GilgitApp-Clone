import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SignUpFormData from './SignUpFormData';
import { SignUpForm } from '../../Types';
import { signUpFormStore } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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
    name: Yup.string().required('Full Name is required'),
    location: Yup.string().required('Location is required'),
    phone: Yup.string().required('Phone Number is required'),
    email: Yup.string().required('Email is required'),
    number: Yup.string().required('WhatsApp Number is required'),
});

export const SignUpform = () => {
    const navigation = useNavigation();
    const signUpEditing = signUpFormStore(state => state.signUpEditing)
    const selectedsignUpForm = signUpFormStore(state => state.selectedsignUpForm)
    const signup = signUpFormStore(state => state.signUp)
    const setSignUp = signUpFormStore(state => state.setSignUp)
    const [type, setType] = useState(signUpEditing && selectedsignUpForm ? selectedsignUpForm.type : '')

    const initialValues: SignUpForm = {
        name: signUpEditing && selectedsignUpForm ? selectedsignUpForm.name : '',
        location: signUpEditing && selectedsignUpForm ? selectedsignUpForm.location : '',
        phone: signUpEditing && selectedsignUpForm ? selectedsignUpForm.phone : '',
        id: signUpEditing && selectedsignUpForm ? selectedsignUpForm.id : '',
        number: signUpEditing && selectedsignUpForm ? selectedsignUpForm.number : '',
    }

    const onSubmit = (values: SignUpForm) => {
        const formState = [...signup]
        if (signUpEditing && selectedsignUpForm) {
            console.log(values, 'working');
            const updatedForm = {
                id: selectedsignUpForm.id,
                name: values.name,
                location: values.location,
                type,
                phone: values.phone,
                number: values.number
            };
            const index = formState.findIndex(u => u.id === selectedsignUpForm.id);
            formState[index] = updatedForm;
        } else {
            formState.push({
                id: Math.floor(Math.random() * 100),
                name: values.name,
                location: values.location,
                type,
                phone: values.phone,
                number: values.number
            })
        }
        setSignUp(formState);
        navigation.goBack();
    }

    return (
        <ScrollView style={{ backgroundColor: '#ffff', flex: 1, }}>
            <View>

                <View style={{ backgroundColor: '#ffff', top: 40, }}>
                    <View style={styles.Addphoto}>
                        <TouchableOpacity>
                            <Text style={{ alignSelf: 'center', fontSize: 16, marginTop: 2, color: 'gray.500' }} >
                                Add Photo
                            </Text>
                            <View style={{ alignSelf: 'center' }}>
                                <AddIcon size={6} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                render={({ errors, handleChange, values, handleSubmit }) => {
                    return (
                        <FormControl w="100%" alignSelf={'center'}>
                            <Stack mx="4">
                                <FormControl.Label>Full Name</FormControl.Label>
                                <Input
                                    placeholder="Full Name"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                />
                                {errors.name && <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>}
                                <FormControl.Label>Email</FormControl.Label>
                                <Input
                                    placeholder="Enter your email address"
                                    value={values.email}
                                    onChangeText={handleChange('email adress')}
                                />
                                {errors.email && (
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                )}
                                <FormControl.Label>Location</FormControl.Label>
                                <Input
                                    placeholder="Enter your Location"
                                    value={values.location}
                                    onChangeText={handleChange('location')}
                                />
                                {errors.location && (
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.location}</Text>
                                )}
                                <FormControl.Label>Contact Number</FormControl.Label>
                                <Input
                                    value={String(values.phone) ?? ''}
                                    keyboardType={'numeric'}
                                    placeholder="Enter your Phone Number"
                                    onChangeText={handleChange('phone')}
                                />
                                {errors.phone && <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone}</Text>}
                                <FormControl.Label>WhatsApp Number</FormControl.Label>
                                <Input
                                    value={String(values.number) ?? ''}
                                    keyboardType={'numeric'}
                                    placeholder="Enter your WhatsApp Number"
                                    onChangeText={handleChange('number')}
                                />
                                {errors.number && <Text style={{ fontSize: 10, color: 'red' }}>{errors.number}</Text>}
                                <Button style={styles.SaveButton} rounded={100} size="lg" mt={25} onPress={() => handleSubmit()}>
                                    {signUpEditing ? 'Update' : 'Save'}
                                </Button>
                            </Stack>
                        </FormControl>
                    )
                }}
            />

        </ScrollView>

    )
}

const styles = StyleSheet.create({
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
    input: {
        width: 350,
        borderRadius: 3,
        height: 48,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#0A0B0E',

    },
    SaveButton: {
        width: 360,
        borderRadius: 4,
        height: 48,
        borderWidth: 1,
        borderColor: '#4285F4',
        backgroundColor: '#4285F4',
    },
    SaveButtonText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFFFFF'
    }

})




