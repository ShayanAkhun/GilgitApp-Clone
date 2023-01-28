import { ImageSourcePropType } from "react-native";

export interface Cars {
    price?: number | string,
    description?: string,
    location?: string,
    views?: number,
    image?: ImageSourcePropType | undefined,
    id?: number | string,
    type?: string,
    title?: string,
    manufacturer?: string
    engine?: number | string,
    modelYear?: number | string,
    city?: string,
    warranty?: string,
    condition?: string,
    negotation?: string,
    marcha?: string,
    fuel?: string,
    transmission?: string,
    milage?: string
}


