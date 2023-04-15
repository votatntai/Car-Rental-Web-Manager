import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShowroomCarService } from '../showroom-car.service';
import { Machine } from '../../machine/machine.type';

@Injectable({
    providedIn: 'root'
})

export class ShowroomMachineDetailResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Machine> {
        return this._machineService.getMachineById(route.paramMap.get('id'));
    }
}
