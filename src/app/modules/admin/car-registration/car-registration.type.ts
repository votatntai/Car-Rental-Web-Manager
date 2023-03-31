import { AdditionalCharge } from "app/modules/types/additional-charge.type";
import { CarRegistrationCalendar } from "app/modules/types/car-registration-calendar.type";
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
    description: string,
    images: string[],
    calendars: CarRegistrationCalendar[],
    carOwner: CarOwner,
    additionalCharge: AdditionalCharge,
    driver?: Driver
}

export interface CarRegistrationPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}