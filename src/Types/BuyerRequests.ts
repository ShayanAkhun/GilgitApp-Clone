export interface UploadBuyerRequests {
    name?: string,
    price?: number | string,
    description?: string,
    manufacturer?: string,
    location?: string,
    type?: string
    id?: number | string
}
export enum BuyerCategory {
    CARS = 'Cars',
    BIKES = 'Bikes',
    LAPTOPS = 'Laptops',
    MOBILES = 'Mobiles',
    APPLIANCES = 'Appliances',
}