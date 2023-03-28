import { AdditionalCharge } from "app/modules/types/additional-charge.type";
import { Model } from "app/modules/types/model.type";
import { ProductCompany } from "app/modules/types/product-company.type";
import { CarOwner } from "../car-owner/car-owner.type";
import { Driver } from "../driver/driver.type";
import { Showroom } from "../showroom/showroom.type";

export interface Machine {
    id: string,
    name: string,
    licensePlate: string,
    price: string,
    createAt: string,
    description?: string,
    model: Model,
    location: Location,
    additionalCharge: AdditionalCharge,
    driver?: Driver,
    carOwner: CarOwner,
    showroom?: Showroom,
    rented: number,
    receiveStartTime: string,
    receiveEndTime: string,
    returnStartTime: string,
    returnEndTime: string,
    star: number,
    status: string,
    productionCompany: ProductCompany,
    images: string[]
}

export interface MachinePagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}