import { ImageSourcePropType } from "react-native";

export interface Bikes {
    price: string | number,
    description?: string,
    location?: string,
    views?: number,
    image?: ImageSourcePropType | undefined,
    id: number
}