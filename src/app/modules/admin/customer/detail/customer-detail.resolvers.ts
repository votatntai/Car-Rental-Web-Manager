import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.type';

@Injectable({
    providedIn: 'root'
})

export class CustomerDetailResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
        return this._customerService.getCustomerById(route.paramMap.get('id'));
    }
}
