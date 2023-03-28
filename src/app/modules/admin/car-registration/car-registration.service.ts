import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { CarRegistration, CarRegistrationPagination } from './car-registration.type';

@Injectable({ providedIn: 'root' })
export class CarRegistrationService {

    private _carRegistration: BehaviorSubject<CarRegistration | null> = new BehaviorSubject(null);
    private _carRegistrations: BehaviorSubject<CarRegistration[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<CarRegistrationPagination | null> = new BehaviorSubject(null)

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for car registration
 */
    get carRegistration$(): Observable<CarRegistration> {
        return this._carRegistration.asObservable();
    }

    /**
     * Getter for car registrations
     */
    get carRegistrations$(): Observable<CarRegistration[]> {
        return this._carRegistrations.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<CarRegistrationPagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get car registrations
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getCarRegistrations(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: CarRegistrationPagination; data: CarRegistration[] }> {
        return this._httpClient.get<{ pagination: CarRegistrationPagination; data: CarRegistration[] }>('/api/car-registrations', {
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
                this._carRegistrations.next(response.data);
            }),
        );
    }

    /**
     * Get car registration by id
     */
    getCarRegistrationById(id: string): Observable<CarRegistration> {
        return this.carRegistrations$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<CarRegistration>('/api/car-registrations/' + id).pipe(
                map((carRegistration) => {

                    // Set value for current car registration
                    this._carRegistration.next(carRegistration);

                    // Return the new contact
                    return carRegistration;
                })
            ))
        );
    }

    /**
* Create car registration
*/
    createCarRegistration(data) {
        return this.carRegistrations$.pipe(
            take(1),
            switchMap((carRegistrations) => this._httpClient.post<CarRegistration>('/api/car-registrations', data).pipe(
                map((newCarRegistration) => {

                    // Update car registration list with current page size
                    this._carRegistrations.next([newCarRegistration, ...carRegistrations].slice(0, this._pagination.value.pageSize));

                    return newCarRegistration;
                })
            ))
        )
    }

    /**
* Update car registration
*/
    updateCarRegistration(id: string, data) {
        return this.carRegistrations$.pipe(
            take(1),
            switchMap((carRegistrations) => this._httpClient.put<CarRegistration>('/api/car-registrations/' + id, data).pipe(
                map((updatedCarRegistration) => {

                    // Find and replace updated car registration
                    const index = carRegistrations.findIndex(item => item.id === id);
                    carRegistrations[index] = updatedCarRegistration;
                    this._carRegistrations.next(carRegistrations);

                    // Update car registration
                    this._carRegistration.next(updatedCarRegistration);

                    return updatedCarRegistration;
                })
            ))
        )
    }
}