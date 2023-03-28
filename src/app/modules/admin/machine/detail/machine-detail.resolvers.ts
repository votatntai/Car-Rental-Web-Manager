import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MachineService } from '../machine.service';
import { Machine } from '../machine.type';

@Injectable({
    providedIn: 'root'
})

export class MachineDetailResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Machine> {
        return this._machineService.getMachineById(route.paramMap.get('id'));
    }
}
