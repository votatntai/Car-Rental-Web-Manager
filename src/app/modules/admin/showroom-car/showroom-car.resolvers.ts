import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShowroomCarService } from './showroom-car.service';
import { Machine, MachinePagination } from '../machine/machine.type';

@Injectable({
    providedIn: 'root'
})

export class ShowroomsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _machineService: ShowroomCarService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: MachinePagination; data: Machine[] }> {
        return this._machineService.getMachines();
    }
}
