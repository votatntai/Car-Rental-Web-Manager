import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CarOwnerService } from '../car-owner.service';
import { CarOwner } from '../car-owner.type';

@Injectable({
    providedIn: 'root'
})

export class CarOwnerDetailResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CarOwner> {
        return this._carOwnerService.getCarOwnerById(route.paramMap.get('id'));
    }
}
