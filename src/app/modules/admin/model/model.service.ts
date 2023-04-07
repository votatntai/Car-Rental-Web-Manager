import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Model, ModelPagination } from './model.type';
import { ProductionCompany, ProductionCompanyPagination } from 'app/modules/types/production-company.type';

@Injectable({ providedIn: 'root' })
export class ModelService {

    private _model: BehaviorSubject<Model | null> = new BehaviorSubject(null);
    private _models: BehaviorSubject<Model[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ModelPagination | null> = new BehaviorSubject(null);
    private _productionCompany: BehaviorSubject<ProductionCompany | null> = new BehaviorSubject(null);
    private _productionCompanies: BehaviorSubject<ProductionCompany[] | null> = new BehaviorSubject(null);
    private _pcPagination: BehaviorSubject<ProductionCompanyPagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for model
 */
    get model$(): Observable<Model> {
        return this._model.asObservable();
    }

    /**
     * Getter for models
     */
    get models$(): Observable<Model[]> {
        return this._models.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<ModelPagination> {
        return this._pagination.asObservable();
    }

    /**
* Getter for model
*/
    get productionCompany$(): Observable<ProductionCompany> {
        return this._productionCompany.asObservable();
    }

    /**
     * Getter for models
     */
    get productionCompanies$(): Observable<ProductionCompany[]> {
        return this._productionCompanies.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pcPagination$(): Observable<ProductionCompanyPagination> {
        return this._pcPagination.asObservable();
    }

    /**
 * Get models
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param model
 * @param search
 */
    getModels(pageNumber: number = 0, pageSize: number = 20, sort: string = 'name', model: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: ModelPagination; data: Model[] }> {

        return this._httpClient.get<{ pagination: ModelPagination; data: Model[] }>('/api/models', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                sort,
                model,
                name: search || ''
            }
        }).pipe(
            tap((response) => {

                this._pagination.next(response.pagination);
                this._models.next(response.data);
            }),
        );
    }

    /**
* Get production companies
*
*
* @param page
* @param size
* @param sort
* @param model
* @param search
*/
    getProductionCompanies(pageNumber: number = 0, pageSize: number = 20, sort: string = 'name', model: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: ProductionCompanyPagination; data: ProductionCompany[] }> {

        return this._httpClient.get<{ pagination: ProductionCompanyPagination; data: ProductionCompany[] }>('/api/production-companies', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                sort,
                model,
                name: search || ''
            }
        }).pipe(
            tap((response) => {

                this._pcPagination.next(response.pagination);
                this._productionCompanies.next(response.data);
            }),
        );
    }

    /**
     * Get model by id
     */
    getModelById(id: string): Observable<Model> {
        return this.models$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Model>('/api/models/' + id).pipe(
                map((model) => {

                    // Set value for current model
                    this._model.next(model);

                    // Return the new contact
                    return model;
                })
            ))
        );
    }

    /**
* Create model
*/
    createModel(data) {
        return this.models$.pipe(
            take(1),
            switchMap((models) => this._httpClient.post<Model>('/api/models', data).pipe(
                map((newModel) => {

                    // Update model list with current page size
                    this._models.next([newModel, ...models].slice(0, this._pagination.value.pageSize));

                    return newModel;
                })
            ))
        )
    }

    /**
    * Update model
    */
    updateModel(id: string, data) {
        return this.models$.pipe(
            take(1),
            switchMap((models) => this._httpClient.put<Model>('/api/models/' + id, data).pipe(
                map((updatedModel) => {

                    // Find and replace updated model
                    const index = models.findIndex(item => item.id === id);
                    models[index] = updatedModel;
                    this._models.next(models);

                    // Update model
                    this._model.next(updatedModel);

                    return updatedModel;
                })
            ))
        )
    }
}