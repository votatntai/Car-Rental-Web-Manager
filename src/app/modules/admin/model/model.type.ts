import { ProductionCompany } from "app/modules/types/production-company.type";

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
    productionCompany: ProductionCompany,
}

export interface ModelPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}