import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ManagerService } from '../manager.service';
import { Manager } from '../manager.type';

@Injectable({
    providedIn: 'root'
})

export class ManagerDetailResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Manager> {
        return this._managerService.getManagerById(route.paramMap.get('id'));
    }
}
