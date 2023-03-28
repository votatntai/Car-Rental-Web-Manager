import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Customer, CustomerPagination } from './customer.type';

@Injectable({ providedIn: 'root' })
export class CustomerService {

    private _customer: BehaviorSubject<Customer | null> = new BehaviorSubject(null);
    private _customers: BehaviorSubject<Customer[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<CustomerPagination | null> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for customer
 */
    get customer$(): Observable<Customer> {
        return this._customer.asObservable();
    }

    /**
     * Getter for customers
     */
    get customers$(): Observable<Customer[]> {
        return this._customers.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<CustomerPagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get customers
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getCustomers(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: CustomerPagination; data: Customer[] }> {
        return this._httpClient.get<{ pagination: CustomerPagination; data: Customer[] }>('/api/customers', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                sort,
                order,
                name: search || ''
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._customers.next(response.data);
            }),
        );
    }

    /**
     * Get customer by id
     */
    getCustomerById(id: string): Observable<Customer> {
        return this.customers$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Customer>('/api/customers/' + id).pipe(
                map((customer) => {

                    // Set value for current customer
                    this._customer.next(customer);

                    // Return the new contact
                    return customer;
                })
            ))
        );
    }

    /**
 * Get customer by id
 */
    updateCustomerAccountStatus(id: string, status: boolean) {
        return this.customers$.pipe(
            take(1),
            switchMap(() => this._httpClient.put<Customer>('/api/customers/' + id, { status: status }).pipe(
                map((updatedCustomer) => {

                    // Update current customer
                    this._customer.next(updatedCustomer);

                    return updatedCustomer;
                })
            ))
        )
    }
}