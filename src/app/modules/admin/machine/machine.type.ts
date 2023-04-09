import { AdditionalCharge } from "app/modules/types/additional-charge.type";
import { CarCalendar } from "app/modules/types/car-registration-calendar.type";
import { ProductionCompany } from "app/modules/types/production-company.type";
import { Location } from "../../types/location.type";
import { CarOwner } from "../car-owner/car-owner.type";
import { Driver } from "../driver/driver.type";
import { Model } from "../model/model.type";
import { Showroom } from "../showroom/showroom.type";
import { Image } from "app/modules/types/image.type";

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
    carCalendars: CarCalendar[],
    productionCompany: ProductionCompany,
    images: Image[]
}

export interface MachinePagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}