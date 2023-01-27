
import { Cars, CarsCategory } from '../../Types';
import { CarsStore } from '../../store';
import * as Yup from 'yup';

const carsEditing = CarsStore(state => state.carsEditing)
const selectedCars = CarsStore(state => state.selectedCars)


export const initialValues: Cars = {
    title: carsEditing && selectedCars ? selectedCars.title : '',
    price: carsEditing && selectedCars ? selectedCars.price : '',
    description: carsEditing && selectedCars ? selectedCars.description : '',
    location: carsEditing && selectedCars ? selectedCars.location : '',
    type: carsEditing && selectedCars ? selectedCars.type : '',
    id: carsEditing && selectedCars ? selectedCars.id : '',
    manufacturer: carsEditing && selectedCars ? selectedCars.manufacturer : '',
    engine: carsEditing && selectedCars ? selectedCars.engine : '',
    modelYear: carsEditing && selectedCars ? selectedCars.modelYear : '',
    city: carsEditing && selectedCars ? selectedCars.city : '',
    warranty: "",
    negotation: "",
    condition: "",
    marcha: "",
    fuel: "",
    transmission: "",
    milage: ""
}


export const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required'),
    price: Yup.string().required('This field is required'),
    location: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
    image: Yup.string().required('You should Upload at least one image'),
    manufacturer: Yup.string().required('This field is required'),
    title: Yup.string().required('This field is required'),
    warranty: Yup.string(),
    negotation: Yup.string(),
    condition: Yup.string(),
    marcha: Yup.string(),
    fuel: Yup.string(),
    transmission: Yup.string(),
    milage: Yup.string(),


})