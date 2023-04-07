import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ModelService } from './model.service';
import { Model, ModelPagination } from './model.type';

@Injectable({
    providedIn: 'root'
})

export class ModelsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _modelService: ModelService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return forkJoin([
            this._modelService.getModels(),
            this._modelService.getProductionCompanies(),
        ]);
    }
}
