import { useNavigation } from "@react-navigation/native";
import { Buyerstore } from "../../store";
import { UploadBuyerRequests } from "../../Types";
import * as Yup from 'yup';



const buyerstore = Buyerstore(state => state.buyerstore)
const setbrStores = Buyerstore(state => state.setbrStores)
const navigation = useNavigation();
const brStoresEditing = Buyerstore(state => state.brStoresEditing)
const selectedbrStores = Buyerstore(state => state.selectedbrStores)


export const validationSchema = Yup.object().shape({
    name: Yup.string().required('title is a required field'),
    price: Yup.string().required('This field is  required '),
    location: Yup.string().required('This field is  required'),
    description: Yup.string().required('This field should not be empty'),
})


export const initialValues: UploadBuyerRequests = {
    name: brStoresEditing && selectedbrStores ? selectedbrStores.name : '',
    price: brStoresEditing && selectedbrStores ? selectedbrStores.price : '',
    description: brStoresEditing && selectedbrStores ? selectedbrStores.description : '',
    location: brStoresEditing && selectedbrStores ? selectedbrStores.location : '',
    type: brStoresEditing && selectedbrStores ? selectedbrStores.type : '',
    id: brStoresEditing && selectedbrStores ? selectedbrStores.id : '',
}

export const onSubmit = (values: UploadBuyerRequests,) => {
    const state = [...buyerstore]
    if (brStoresEditing && selectedbrStores) {
        const updatedItems = {
            id: selectedbrStores.id,
            name: values.name,
            price: values.price,
            description: values.description,
            location: values.location,
            manufacturer: values.manufacturer,
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