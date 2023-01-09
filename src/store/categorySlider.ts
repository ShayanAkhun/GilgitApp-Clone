import create from "zustand";
import { categorySlider } from "../Types";

export const defaultCategorySlider: categorySlider[] = [
    {
        id: 1,
        price: 'PKR 125,000',
        description: 'Apple MacBook pro 2018',
        location: 'Gilgit',
        image: require('../assets/CategorySliderImages/Macbook1.png')
    },
    {
        id: 2,
        price: 'PKR 250,000',
        description: 'Apple MacBook 2019',
        location: 'Gilgit , Jutial',
        image: require('../assets/CategorySliderImages/Macbook2.png')
    },
    {
        id: 3,
        price: 'PKR 150,000',
        description: 'Apple M1 pro',
        location: 'Danyore',
        image: require('../assets/CategorySliderImages/Macbook3.png')
    },
    {
        id: 4,
        price: 'PKR 300,00',
        description: 'Apple Macbook Air M1',
        location: 'Jutial,Gilgit',
        image: require('../assets/CategorySliderImages/Macbook4.png')

    },
    {
        id: 5,
        price: 'PKR 450,000',
        description: 'Apple Macboook M1 pro 2022',
        location: 'NLI bazar Gilgit',
        image: require('../assets/CategorySliderImages/Macbook5.png')

    },
    {
        id: 6,
        price: 'PKR 244,500',
        description: 'Apple MacBook 2018',
        location: 'NLI bazar Gilgit',
        image: require('../assets/CategorySliderImages/Macbook6.png')

    }

]

interface CategorySliderStore {
    slider: categorySlider[];
    setSlider: (filters: categorySlider[]) => void;
    sliderEditing: boolean;
    selectedSlider: categorySlider | null;
    setSelectedSlider: (slider: categorySlider) => void;
    discardSlider: () => void;
}

export const CategorySliderStore = create<CategorySliderStore>(set => ({
    slider: defaultCategorySlider,
    sliderEditing: false,
    selectedSlider: null,
    setSlider(slider: categorySlider[]) {
        set(() => ({ slider }));
    },
    setSelectedSlider(slider: categorySlider) {
        set(() => ({ selectedSlider: slider, sliderEditing: true }));
    },
    discardSlider() {
        set(() => ({ selectedSlider: null, sliderEditing: false }))
    },
}));