import { ImageSourcePropType } from "react-native";

export interface Laptops {
    price: string | number,
    description?: string,
    location?: string,
    views?: number,
    image?: ImageSourcePropType | undefined,
    id: number
}