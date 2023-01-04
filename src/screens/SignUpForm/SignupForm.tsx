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
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone Number is required'),
    type: Yup.string().required('Specialist is required'),
});

interface IProps { }



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
                phone: values.phone
            };
            const index = formState.findIndex(u => u.id === selectedsignUpForm.id);
            formState[index] = updatedForm;
        } else {
            formState.push({
                id: Math.floor(Math.random() * 100),
                name: values.name,
                location: values.location,
                type,
                phone: values.phone
            })
        }
        setSignUp(formState);
        navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={{ backgroundColor: '#ffff', flex: 1, height: '100%' }}>
                <View>

                    <View style={{ backgroundColor: '#ffff', top: 40, }}>
                        <View style={styles.Addphoto}>
                            <Pressable alignSelf='center' rounded='full'>
                                <Text style={{ alignSelf: 'center', fontSize: 16, marginTop: 2, color: 'gray.500' }} >
                                    Add Photo
                                </Text>
                                <View style={{ alignSelf: 'center' }}>
                                    <AddIcon size={6} />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    render={({ errors, handleChange, values, handleSubmit }) => {
                        return (
                            <FormControl w="90%" alignSelf={'center'}>
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
                                        value={values.location}
                                        onChangeText={handleChange('location')}
                                    />
                                    {errors.location && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.location}</Text>
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
                                    <FormControl.Label> Contact Number</FormControl.Label>
                                    <Input
                                        placeholder="Enter your Number"
                                        value={values.phone}
                                        onChangeText={handleChange('location')}
                                    />
                                    <FormControl.Label>WhatsApp number</FormControl.Label>
                                    <Input
                                        placeholder="Enter your WhatsApp Number"
                                        value={values.phone}
                                        onChangeText={handleChange('location')}
                                    />
                                    <Button rounded={100} size="lg" mt={25} onPress={() => handleSubmit()}>
                                        {signUpEditing ? 'Update' : 'Save'}
                                    </Button>
                                </Stack>
                            </FormControl>
                        )
                    }}
                />




            </View>

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
        height: 120,
        width: 130,
        bottom: 40,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        rounded: 'full'
    },
    input: {
        width: 350,
        borderRadius: 3,
        height: 48,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#0A0B0E',
        // backgroundColor: '#FFFFFF'

    },
    SaveButton: {
        width: 350,
        borderRadius: 4,
        height: 48,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#4285F4',
        backgroundColor: '#4285F4',
        top: 50
    },
    SaveButtonText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#FFFFFF'
    }

})




