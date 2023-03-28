import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CarOwnerService } from './car-owner.service';
import { CarOwner, CarOwnerPagination } from './car-owner.type';

@Injectable({
    providedIn: 'root'
})

export class CarOwnersResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _carOwnerService: CarOwnerService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: CarOwnerPagination; data: CarOwner[] }> {
        return this._carOwnerService.getCarOwners();
    }
}
