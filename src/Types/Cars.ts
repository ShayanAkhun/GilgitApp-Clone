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
    marcha?: string
}


export enum CarsCategory {

    TOYOTA = 'Toyota',
    HONDA = 'Honda',
    NISSAN = 'Nissan',
    HYUNDAI = 'Hyundai',
    SUZUKI = 'Suzuki',
    JEEP = 'Jeep',
    MAZDA = 'Mazda',
    FORD = 'Ford',
    MITSUBISHI = 'Mitsubishi',
    AUDI = 'Audi',
    OTHERS = 'Others'

}