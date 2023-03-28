import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ManagerService } from './manager.service';
import { Manager, ManagerPagination } from './manager.type';

@Injectable({
    providedIn: 'root'
})

export class ManagersResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _managerService: ManagerService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: ManagerPagination; data: Manager[] }> {
        return this._managerService.getManagers();
    }
}
