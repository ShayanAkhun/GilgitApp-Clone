import create from "zustand";
import { Laptops } from "../Types";

export const defaultLaptopStore: Laptops[] = [
    {
        id: 1,
        price: 'PKR 125,000',
        description: 'Apple MacBook pro 2018',
        location: 'Gilgit',
        image: require('../assets/SliderImages/Laptops/Macbook1.png')
    },
    {
        id: 2,
        price: 'PKR 250,000',
        description: 'Apple MacBook 2019',
        location: 'Gilgit , Jutial',
        image: require('../assets/SliderImages/Laptops/Macbook2.png')
    },
    {
        id: 3,
        price: 'PKR 150,000',
        description: 'Apple M1 pro',
        location: 'Danyore',
        image: require('../assets/SliderImages/Laptops/Macbook3.png')
    },
    {
        id: 4,
        price: 'PKR 300,00',
        description: 'Apple Macbook Air M1',
        location: 'Jutial,Gilgit',
        image: require('../assets/SliderImages/Laptops/Macbook4.png')

    },
    {
        id: 5,
        price: 'PKR 450,000',
        description: 'Apple Macboook M1 pro 2022',
        location: 'NLI bazar Gilgit',
        image: require('../assets/SliderImages/Laptops/Macbook5.png')

    },
    {
        id: 6,
        price: 'PKR 244,500',
        description: 'Apple MacBook 2018',
        location: 'NLI bazar Gilgit',
        image: require('../assets/SliderImages/Laptops/Macbook6.png')

    }

]

interface LaptopsStore {
    laptops: Laptops[];
    setLaptops: (filters: Laptops[]) => void;
    laptopsEditing: boolean;
    selectedLaptops: Laptops | null;
    setSelectedLaptops: (Laptops: Laptops) => void;
    discardLaptops: () => void;
}

export const LaptopsStore = create<LaptopsStore>(set => ({
    laptops: defaultLaptopStore,
    laptopsEditing: false,
    selectedLaptops: null,
    setLaptops(laptops: Laptops[]) {
        set(() => ({ laptops }));
    },
    setSelectedLaptops(laptops: Laptops) {
        set(() => ({ selectedLaptops: laptops, laptopsEditing: true }));
    },
    discardLaptops() {
        set(() => ({ selectedLaptops: null, laptopsEditing: false }))
    },
}));