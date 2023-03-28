import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CarRegistrationService } from './car-registration.service';
import { CarRegistration, CarRegistrationPagination } from './car-registration.type';

@Injectable({
    providedIn: 'root'
})

export class CarRegistrationsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _machineService: CarRegistrationService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: CarRegistrationPagination; data: CarRegistration[] }> {
        return this._machineService.getCarRegistrations();
    }
}
