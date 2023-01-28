import { ImageSourcePropType } from "react-native";

export interface Laptops {
    price: string | number,
    description?: string,
    location?: string,
    views?: number,
    image?: ImageSourcePropType | undefined,
    id: number,
    model?: string,


}

export enum LaptopsCategory {
    MACBOOK = 'Macbook',
    RAZER = 'Razer',
    DELL = 'Dell',
    HP = 'Hp',
    ASUS = 'Asus',
    ACER = 'Acer',
    LENOVO = 'Lenovo',
    SAMSUNG = 'Samsung',
    TOSHIBA = 'Toshiba',
    LG = 'LG',
    SONY = 'Sony',
    PANASONIC = 'Panasonic',
    OTHER = 'Pthers',
}