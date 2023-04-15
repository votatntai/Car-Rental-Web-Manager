import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Showroom, ShowroomPagination } from './showroom.type';
import { ProductionCompany, ProductionCompanyPagination } from 'app/modules/types/production-company.type';

@Injectable({ providedIn: 'root' })
export class ShowroomService {

    private _showroom: BehaviorSubject<Showroom | null> = new BehaviorSubject(null);
    private _showrooms: BehaviorSubject<Showroom[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ShowroomPagination | null> = new BehaviorSubject(null);
    private _productionCompany: BehaviorSubject<ProductionCompany | null> = new BehaviorSubject(null);
    private _productionCompanies: BehaviorSubject<ProductionCompany[] | null> = new BehaviorSubject(null);
    private _pcPagination: BehaviorSubject<ProductionCompanyPagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for showroom
 */
    get showroom$(): Observable<Showroom> {
        return this._showroom.asObservable();
    }

    /**
     * Getter for showrooms
     */
    get showrooms$(): Observable<Showroom[]> {
        return this._showrooms.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<ShowroomPagination> {
        return this._pagination.asObservable();
    }

    /**
* Getter for showroom
*/
    get productionCompany$(): Observable<ProductionCompany> {
        return this._productionCompany.asObservable();
    }

    /**
     * Getter for showrooms
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
 * Get showrooms
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param showroom
 * @param search
 */
    getShowrooms(pageNumber: number = 0, pageSize: number = 20, sort: string = 'name', showroom: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: ShowroomPagination; data: Showroom[] }> {

        return this._httpClient.get<{ pagination: ShowroomPagination; data: Showroom[] }>('/api/showrooms', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                sort,
                showroom,
                name: search || ''
            }
        }).pipe(
            tap((response) => {

                this._pagination.next(response.pagination);
                this._showrooms.next(response.data);
            }),
        );
    }

    /**
     * Get showroom by id
     */
    getShowroomById(id: string): Observable<Showroom> {
        return this.showrooms$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Showroom>('/api/showrooms/' + id).pipe(
                map((showroom) => {

                    // Set value for current showroom
                    this._showroom.next(showroom);

                    // Return the new contact
                    return showroom;
                })
            ))
        );
    }

    /**
* Create showroom
*/
    createShowroom(data) {
        return this.showrooms$.pipe(
            take(1),
            switchMap((showrooms) => this._httpClient.post<Showroom>('/api/showrooms', data).pipe(
                map((newShowroom) => {

                    // Update showroom list with current page size
                    this._showrooms.next([newShowroom, ...showrooms].slice(0, this._pagination.value.pageSize));

                    return newShowroom;
                })
            ))
        )
    }

    /**
    * Update showroom
    */
    updateShowroom(id: string, data) {
        return this.showrooms$.pipe(
            take(1),
            switchMap((showrooms) => this._httpClient.put<Showroom>('/api/showrooms/' + id, data).pipe(
                map((updatedShowroom) => {

                    // Find and replace updated showroom
                    const index = showrooms.findIndex(item => item.id === id);
                    showrooms[index] = updatedShowroom;
                    this._showrooms.next(showrooms);

                    // Update showroom
                    this._showroom.next(updatedShowroom);

                    return updatedShowroom;
                })
            ))
        )
    }
}