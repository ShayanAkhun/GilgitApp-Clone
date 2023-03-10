import { ImageSourcePropType } from "react-native";

export interface Bikes {
    price: string | number,
    description?: string,
    location?: string,
    views?: number,
    image?: ImageSourcePropType | undefined,
    id?: number | string,
    type?: string,
    manufacturer?: string,
    title?: string,
    warranty?: string,
    negotation?: string,
    condition?: string,
    marcha?: string,
    model?: string,
    engine?: string,
    bikeColor?: string,
    registeredCity?: string,
    milage?: string
}


export enum BikesCategory {
    HONDA = 'Honda',
    UNIQUE = 'Unique',
    UNITED = 'United',
    YAMAHA = 'Yamaha',
    ROADPRINCE = 'Road Prince',
    SUZUKI = 'Suzuki',
    RAVI = 'Ravi',
    ZXMCO = 'Zxmco',
    OTHER = 'Others',
}




