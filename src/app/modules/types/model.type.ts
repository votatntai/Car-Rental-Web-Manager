import { ProductCompany } from "./product-company.type";

export interface Model {
    id: string,
    name: string,
    cellingPrice: string,
    floorPrice: string,
    seater: number,
    chassic: string,
    yearOfManufacture: number,
    transmissionType: string,
    fuelType: string,
    fuelConsumption: string,
    productionCompany: ProductCompany,
}