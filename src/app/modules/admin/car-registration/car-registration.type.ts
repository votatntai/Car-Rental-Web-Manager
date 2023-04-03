import { AdditionalCharge } from "app/modules/types/additional-charge.type";
import { CarCalendar } from "app/modules/types/car-registration-calendar.type";
import { CarOwner } from "../car-owner/car-owner.type";
import { Driver } from "../driver/driver.type";

export interface CarRegistration {
    id: string,
    name: string,
    licensePlate: string,
    transmissionType: string,
    fuelType: string,
    seater: number,
    price: number,
    fuelConsumption: string,
    yearOfManufacture: string,
    productionCompany: string,
    model: string,
    location: string,
    createAt: string,
    chassis: string,
    description: string,
    images: string[],
    calendars: CarCalendar[],
    carOwner: CarOwner,
    additionalCharge: AdditionalCharge,
    driver?: Driver,
    status: boolean
}

export interface CarRegistrationPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}