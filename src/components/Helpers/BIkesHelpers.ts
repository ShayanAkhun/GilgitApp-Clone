import { Bikes } from "../../Types";
import { useNavigation } from "@react-navigation/native";
import * as Yup from 'yup';
import { BikesStore } from "../../store/BIkesStore";
const setBikes = BikesStore(state => state.setBikes)

const navigation = useNavigation();
const bikesEditing = BikesStore(state => state.bikesEditing)
const selectedBikes = BikesStore(state => state.selectedBikes)
const bikes = BikesStore(state => state.bikes)



export const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is a required field'),
    price: Yup.string().required('This field is  required '),
    location: Yup.string().required('This field is  required'),
    description: Yup.string().required('This field should not be empty'),
    title: Yup.string().required('title is a required field'),
    warranty: Yup.string(),
    negotation: Yup.string(),
    condition: Yup.string(),
    marcha: Yup.string(),
    model: Yup.string(),
    engine: Yup.string(),
    bikeColor: Yup.string(),
    registeredCity: Yup.string(),
    milage: Yup.string(),
})


export const initialValues: Bikes = {
    price: bikesEditing && selectedBikes ? selectedBikes.price : '',
    description: bikesEditing && selectedBikes ? selectedBikes.description : '',
    location: bikesEditing && selectedBikes ? selectedBikes.location : '',
    type: bikesEditing && selectedBikes ? selectedBikes.type : '',
    id: bikesEditing && selectedBikes ? selectedBikes.id : '',
    title: bikesEditing && selectedBikes ? selectedBikes.title : '',
    warranty: "",
    negotation: "",
    condition: "",
    marcha: "",
    model: "",
    bikeColor: "",
    registeredCity: "",
    milage: "",
    engine: "",
}

export const onSubmit = (values: Bikes,) => {
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