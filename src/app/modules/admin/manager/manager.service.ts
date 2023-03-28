import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Manager, ManagerPagination } from './manager.type';

@Injectable({ providedIn: 'root' })
export class ManagerService {

    private _manager: BehaviorSubject<Manager | null> = new BehaviorSubject(null);
    private _managers: BehaviorSubject<Manager[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ManagerPagination | null> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for manager
 */
    get manager$(): Observable<Manager> {
        return this._manager.asObservable();
    }

    /**
     * Getter for managers
     */
    get managers$(): Observable<Manager[]> {
        return this._managers.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<ManagerPagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get managers
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getManagers(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: ManagerPagination; data: Manager[] }> {
        return this._httpClient.get<{ pagination: ManagerPagination; data: Manager[] }>('/api/users', {
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
                this._managers.next(response.data);
            }),
        );
    }

    /**
     * Get manager by id
     */
    getManagerById(id: string): Observable<Manager> {
        return this.managers$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Manager>('/api/users/' + id).pipe(
                map((manager) => {

                    // Set value for current manager
                    this._manager.next(manager);

                    // Return the new contact
                    return manager;
                })
            ))
        );
    }

    /**
 * Get manager by id
 */
    updateManagerStatus(id: string, status: boolean) {
        return this.managers$.pipe(
            take(1),
            switchMap(() => this._httpClient.put<Manager>('/api/users/' + id, { status: status }).pipe(
                map((updatedManager) => {

                    // Update current manager
                    this._manager.next(updatedManager);

                    return updatedManager;
                })
            ))
        )
    }

    /**
* Create manager
*/
    createManager(data) {
        return this.managers$.pipe(
            take(1),
            switchMap((managers) => this._httpClient.post<Manager>('/api/users/manager', data).pipe(
                map((newManager) => {

                    // Update manager list with current page size
                    this._managers.next([newManager, ...managers].slice(0, this._pagination.value.pageSize));

                    return newManager;
                })
            ))
        )
    }

    /**
* Update manager
*/
    updateManager(id: string, data) {
        return this.managers$.pipe(
            take(1),
            switchMap((managers) => this._httpClient.put<Manager>('/api/users/' + id, data).pipe(
                map((updatedManager) => {

                    // Find and replace updated manager
                    const index = managers.findIndex(item => item.id === id);
                    managers[index] = updatedManager;
                    this._managers.next(managers);

                    // Update manager
                    this._manager.next(updatedManager);

                    return updatedManager;
                })
            ))
        )
    }
}