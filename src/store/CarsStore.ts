import create from "zustand";
import { Cars } from "../Types";

export const defaultCars: Cars[] = [
    {
        id: 1,
        price: 'PKR 25Lac',
        description: 'Ford Mustang 2022',
        location: 'Gilgit',
        image: require('../assets/SliderImages/Cars/car5.png')
    },
    {
        id: 2,
        price: 'PKR 4Lac',
        description: 'Toyota Vitz',
        location: 'Gilgit , Jutial',
        image: require('../assets/SliderImages/Cars/car2.png')
    },
    {
        id: 3,
        price: 'PKR 20Lac',
        description: 'Ford Mustang 1996',
        location: 'Danyore',
        image: require('../assets/SliderImages/Cars/car3.png')
    },
    {
        id: 4,
        price: 'PKR 30Lac',
        description: 'Hyundai Elantra',
        location: 'Jutial,Gilgit',
        image: require('../assets/SliderImages/Cars/car4.png')

    },
    {
        id: 5,
        price: 'PKR 45lac',
        description: 'Changa Alsvin',
        location: 'NLI bazar Gilgit',
        image: require('../assets/SliderImages/Cars/car1.png')

    },
    {
        id: 6,
        price: 'PKR 12Lac',
        description: 'Volkswagen Beetle',
        location: 'NLI bazar Gilgit',
        image: require('../assets/SliderImages/Cars/car6.png')

    }

]

interface CarsStore {
    cars: Cars[];
    setCars: (filters: Cars[]) => void;
    carsEditing: boolean;
    selectedCars: Cars | null;
    setSelectedCars: (slider: Cars) => void;
    discardCars: () => void;
}

export const CarsStore = create<CarsStore>(set => ({
    cars: defaultCars,
    carsEditing: false,
    selectedCars: null,
    setCars(cars: Cars[]) {
        set(() => ({ cars }));
    },
    setSelectedCars(cars: Cars) {
        set(() => ({ selectedCars: cars, carsEditing: true }));
    },
    discardCars() {
        set(() => ({ selectedCars: null, carsEditing: false }))
    },
}));