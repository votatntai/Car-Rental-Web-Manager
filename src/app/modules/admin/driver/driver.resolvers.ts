import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { DriverService } from './driver.service';
import { Driver, DriverPagination } from './driver.type';

@Injectable({
    providedIn: 'root'
})

export class DriversResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: DriverPagination; data: Driver[] }> {
        return this._driverService.getDrivers();
    }
}
