import { Promotion } from "app/modules/types/promotion.type";
import { Customer } from "../customer/customer.type";
import { Driver } from "../driver/driver.type";
import { Machine } from "../machine/machine.type";

export interface Order {
    id: string,
    customer: Customer,
    orderDetails: OrderDetail[],
    rentalTime: number,
    amount: number,
    unitPrice: number,
    deliveryFee: number,
    deliveryDistance: number,
    deposit: number,
    isPaid: boolean,
    status: string,
    description?: string,
    createAt: string,
    promotion: Promotion
}

export interface OrderDetail {
    id: string,
    car: Machine,
    deleveryLocation: Location,
    pickUpLocation: Location,
    deliveryTime?: string,
    pickUpTime?: string,
    startTime: string,
    endTime: string,
    driver?: Driver
}

export interface OrderPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}