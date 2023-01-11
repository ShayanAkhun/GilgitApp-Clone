import create from "zustand";
import { Bikes } from "../Types";

export const defaultBikes: Bikes[] = [
    {
        id: 1,
        price: 'PKR 325,000',
        description: 'Cafe Racer 2022 Edition ',
        location: 'Gilgit',
        image: require('../assets/SliderImages/Bikes/bike1.png')
    },
    {
        id: 2,
        price: 'PKR 250,000',
        description: 'Honda 125 2019',
        location: 'Gilgit , Jutial',
        image: require('../assets/SliderImages/Bikes/bike2.png')
    },
    {
        id: 3,
        price: 'PKR 150,000',
        description: 'Unique 125 2019',
        location: 'Danyore',
        image: require('../assets/SliderImages/Bikes/bike3.png')
    },
    {
        id: 4,
        price: 'PKR 300,00',
        description: 'Honda Euro 125 2022 ',
        location: 'Jutial,Gilgit',
        image: require('../assets/SliderImages/Bikes/bike4.png')

    },
    {
        id: 5,
        price: 'PKR 450,000',
        description: 'Honda Euro 125 2023 ',
        location: 'NLI bazar Gilgit',
        image: require('../assets/SliderImages/Bikes/bike5.png')

    },
    {
        id: 6,
        price: 'PKR 244,500',
        description: 'Unique 125 2018 Edition',
        location: 'NLI bazar Gilgit',
        image: require('../assets/SliderImages/Bikes/bike6.png')

    }

]

interface BikesStore {
    bikes: Bikes[];
    setBikes: (filters: Bikes[]) => void;
    bikesEditing: boolean;
    selectedBikes: Bikes | null;
    setSelectedBikes: (slider: Bikes) => void;
    discardBikes: () => void;
}

export const BikesStore = create<BikesStore>(set => ({
    bikes: defaultBikes,
    bikesEditing: false,
    selectedBikes: null,
    setBikes(bikes: Bikes[]) {
        set(() => ({ bikes }));
    },
    setSelectedBikes(bikes: Bikes) {
        set(() => ({ selectedBikes: bikes, bikesEditing: true }));
    },
    discardBikes() {
        set(() => ({ selectedBikes: null, bikesEditing: false }))
    },
}));