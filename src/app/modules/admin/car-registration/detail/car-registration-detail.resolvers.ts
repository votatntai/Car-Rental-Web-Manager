import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CarRegistrationService } from '../car-registration.service';
import { CarRegistration } from '../car-registration.type';

@Injectable({
    providedIn: 'root'
})

export class CarRegistrationDetailResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _carRegistrationService: CarRegistrationService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CarRegistration> {
        return this._carRegistrationService.getCarRegistrationById(route.paramMap.get('id'));
    }
}
