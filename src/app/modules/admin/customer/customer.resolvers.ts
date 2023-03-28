import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CustomerService } from './customer.service';
import { Customer, CustomerPagination } from './customer.type';

@Injectable({
    providedIn: 'root'
})

export class CustomersResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _customerService: CustomerService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: CustomerPagination; data: Customer[] }> {
        return this._customerService.getCustomers();
    }
}
