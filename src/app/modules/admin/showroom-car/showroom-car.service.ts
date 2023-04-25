import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { CarCalendar } from 'app/modules/types/car-registration-calendar.type';
import { Machine, MachinePagination } from '../machine/machine.type';

@Injectable({ providedIn: 'root' })
export class ShowroomCarService {

    private _machine: BehaviorSubject<Machine | null> = new BehaviorSubject(null);
    private _machines: BehaviorSubject<Machine[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<MachinePagination | null> = new BehaviorSubject(null)

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for machine
 */
    get machine$(): Observable<Machine> {
        return this._machine.asObservable();
    }

    /**
     * Getter for machines
     */
    get machines$(): Observable<Machine[]> {
        return this._machines.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<MachinePagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get machines
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getMachines(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string, status?: string):
        Observable<{ pagination: MachinePagination; data: Machine[] }> {
        return this._httpClient.get<{ pagination: MachinePagination; data: Machine[] }>('/api/cars', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                sort,
                order,
                hasShowroom: true,
                ...(search && { name: search }),
                ...(status && { status: status })
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._machines.next(response.data);
            }),
        );
    }

    /**
     * Get machine by id
     */
    getMachineById(id: string): Observable<Machine> {
        return this.machines$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Machine>('/api/cars/' + id).pipe(
                map((machine) => {

                    // Set value for current machine
                    this._machine.next(machine);

                    // Return the new contact
                    return machine;
                })
            ))
        );
    }

    getMachineCalendarById(id: string): Observable<CarCalendar[]> {
        return this.machines$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<CarCalendar[]>('/api/cars/calendars/' + id).pipe(
                map((calendars) => {

                    var newMachine = this._machine.getValue();
                    newMachine.carCalendars = calendars;

                    // Set value for current machine
                    this._machine.next(newMachine);

                    // Return the new contact
                    return calendars;
                })
            ))
        );
    }

    /**
* Create machine
*/
    createMachine(data) {
        return this.machines$.pipe(
            take(1),
            switchMap((machines) => this._httpClient.post<Machine>('/api/cars', data).pipe(
                map((newMachine) => {

                    // Update machine list with current page size
                    this._machines.next([newMachine, ...machines].slice(0, this._pagination.value.pageSize));

                    return newMachine;
                })
            ))
        )
    }

    /**
* Create machine
*/
    createShowroomMachine(data, formData) {
        const httpOptions = {
            params: data
        };
        return this.machines$.pipe(
            take(1),
            switchMap((machines) => this._httpClient.post<Machine>('/api/cars/showrooms', formData, httpOptions).pipe(
                map((newMachine) => {

                    // Update machine list with current page size
                    const newMachines = [newMachine, ...machines].slice(0, this._pagination.value.pageSize);
                    this._machines.next(newMachines);
                    return newMachine;
                })
            ))
        )
    }

    /**
* Update machine
*/
    updateMachine(id: string, data) {
        return this.machines$.pipe(
            take(1),
            switchMap(() => this._httpClient.put<Machine>('/api/cars/' + id, data).pipe(
                map((updatedMachine) => {

                    // Update machine
                    this._machine.next(updatedMachine);

                    return updatedMachine;
                })
            ))
        )
    }
}