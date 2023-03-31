import { ProductCompany } from "app/modules/types/product-company.type";

export interface Model {
    id: string,
    name: string,
    cellingPrice: string,
    floorPrice: string,
    seater: number,
    chassis: string,
    yearOfManufacture: number,
    transmissionType: string,
    fuelType: string,
    fuelConsumption: string,
    productionCompany: ProductCompany,
}

export interface ModelPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}