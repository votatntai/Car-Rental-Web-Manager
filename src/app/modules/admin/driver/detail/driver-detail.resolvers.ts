import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DriverService } from '../driver.service';
import { Driver } from '../driver.type';

@Injectable({
    providedIn: 'root'
})

export class DriverDetailResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _driverService: DriverService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Driver> {
        return this._driverService.getDriverById(route.paramMap.get('id'));
    }
}
