import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Driver, DriverPagination } from './driver.type';

@Injectable({ providedIn: 'root' })
export class DriverService {

    private _driver: BehaviorSubject<Driver | null> = new BehaviorSubject(null);
    private _drivers: BehaviorSubject<Driver[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<DriverPagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for driver
 */
    get driver$(): Observable<Driver> {
        return this._driver.asObservable();
    }

    /**
     * Getter for drivers
     */
    get drivers$(): Observable<Driver[]> {
        return this._drivers.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<DriverPagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get drivers
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getDrivers(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: DriverPagination; data: Driver[] }> {
        return this._httpClient.get<{ pagination: DriverPagination; data: Driver[] }>('/api/drivers', {
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
                this._drivers.next(response.data);
            }),
        );
    }

    /**
     * Get driver by id
     */
    getDriverById(id: string): Observable<Driver> {
        return this.drivers$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Driver>('/api/drivers/' + id).pipe(
                map((driver) => {

                    // Set value for current driver
                    this._driver.next(driver);

                    // Return the new contact
                    return driver;
                })
            ))
        );
    }

    /**
 * Get driver by id
 */
    updateDriverAccountStatus(id: string, status: boolean) {
        return this.drivers$.pipe(
            take(1),
            switchMap(() => this._httpClient.put<Driver>('/api/drivers/' + id, { accountStatus: status }).pipe(
                map((updatedDriver) => {

                    // Update current driver
                    this._driver.next(updatedDriver);

                    return updatedDriver;
                })
            ))
        )
    }

    /**
* Create driver
*/
    createDriver(data) {
        return this.drivers$.pipe(
            take(1),
            switchMap((drivers) => this._httpClient.post<Driver>('/api/drivers', data).pipe(
                map((newDriver) => {

                    // Update driver list with current page size
                    this._drivers.next([newDriver, ...drivers].slice(0, this._pagination.value.pageSize));

                    return newDriver;
                })
            ))
        )
    }

    /**
    * Update driver
    */
    updateDriver(id: string, data) {
        return this.drivers$.pipe(
            take(1),
            switchMap((drivers) => this._httpClient.put<Driver>('/api/drivers/' + id, data).pipe(
                map((updatedDriver) => {

                    // Find and replace updated driver
                    const index = drivers.findIndex(item => item.id === id);
                    drivers[index] = updatedDriver;
                    this._drivers.next(drivers);

                    // Update driver
                    this._driver.next(updatedDriver);

                    return updatedDriver;
                })
            ))
        )
    }
}