import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MachineService } from './machine.service';
import { Machine, MachinePagination } from './machine.type';

@Injectable({
    providedIn: 'root'
})

export class MachinesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _machineService: MachineService) {
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
