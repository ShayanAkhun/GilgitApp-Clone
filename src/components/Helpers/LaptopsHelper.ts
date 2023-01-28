import { useNavigation } from "@react-navigation/native";
import { uploadItemStore } from "../../store";
import { UploadItem } from "../../Types";
import * as Yup from 'yup';



const navigation = useNavigation();
const itemEditing = uploadItemStore(state => state.itemEditing)
const selectedItem = uploadItemStore(state => state.selectedItem)
const item = uploadItemStore(state => state.item)
const setItem = uploadItemStore(state => state.setItem)



export const validationSchema = Yup.object().shape({
    name: Yup.string().required('title is a required field'),
    price: Yup.string().required('Price is a required field'),
    location: Yup.string().required('location is a required field'),
    description: Yup.string().required('description is a required field'),
    manufacturer: Yup.string().required('manufacturer is a required field'),
    condition: Yup.string(),
    warranty: Yup.string(),
    negotiable: Yup.string(),
    marcha: Yup.string(),
    product: Yup.string(),
    ram: Yup.string(),
    memory: Yup.string(),
})

export const initialValues: UploadItem = {
    name: itemEditing && selectedItem ? selectedItem.name : '',
    price: itemEditing && selectedItem ? selectedItem.price : '',
    description: itemEditing && selectedItem ? selectedItem.description : '',
    location: itemEditing && selectedItem ? selectedItem.location : '',
    type: itemEditing && selectedItem ? selectedItem.type : '',
    id: itemEditing && selectedItem ? selectedItem.id : '',
    model: itemEditing && selectedItem ? selectedItem.model : '',
    condition: "",
    warranty: "",
    negotiable: "",
    marcha: "",
    product: "",
    ram: "",
    memory: "",

}
export const onSubmit = (values: UploadItem,) => {
    const itemState = [...item]
    if (itemEditing && selectedItem) {
        console.log(values, 'is this working ');
        const updatedItems = {
            id: selectedItem.id,
            name: values.name,
            price: values.price,
            description: values.description,
            location: values.location,
            manufacturer: values.manufacturer,
            model: values.model,
        }
        const itemIndex = itemState.findIndex(i => i.id === selectedItem.id);
        itemState[itemIndex] = updatedItems;
    } else {
        itemState.push({
            id: Math.floor(Math.random() * 100),
            name: values.name,
            price: values.price,
            description: values.description,
            location: values.location,
            manufacturer: values.manufacturer,
            model: values.model
        })
    }
    setItem(itemState);
    navigation.goBack();
}