import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { CarOwner, CarOwnerPagination } from './car-owner.type';

@Injectable({ providedIn: 'root' })
export class CarOwnerService {

    private _carOwner: BehaviorSubject<CarOwner | null> = new BehaviorSubject(null);
    private _carOwners: BehaviorSubject<CarOwner[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<CarOwnerPagination | null> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for car owner
 */
    get carOwner$(): Observable<CarOwner> {
        return this._carOwner.asObservable();
    }

    /**
     * Getter for car owners
     */
    get carOwners$(): Observable<CarOwner[]> {
        return this._carOwners.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<CarOwnerPagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get carOwners
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getCarOwners(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: CarOwnerPagination; data: CarOwner[] }> {
        return this._httpClient.get<{ pagination: CarOwnerPagination; data: CarOwner[] }>('/api/car-owners', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                sort,
                order,
                name: search || ''
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._carOwners.next(response.data);
            }),
        );
    }

    /**
     * Get car owner by id
     */
    getCarOwnerById(id: string): Observable<CarOwner> {
        return this.carOwners$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<CarOwner>('/api/car-owners/' + id).pipe(
                map((carOwner) => {

                    // Set value for current car owner
                    this._carOwner.next(carOwner);

                    // Return the new contact
                    return carOwner;
                })
            ))
        );
    }

    /**
 * Get car owner by id
 */
    updateCarOwnerAccountStatus(id: string, status: boolean) {
        return this.carOwners$.pipe(
            take(1),
            switchMap(() => this._httpClient.put<CarOwner>('/api/car-owners/' + id, { status: status }).pipe(
                map((updatedCarOwner) => {

                    // Update current car owner
                    this._carOwner.next(updatedCarOwner);

                    return updatedCarOwner;
                })
            ))
        )
    }
}