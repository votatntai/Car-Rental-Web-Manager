import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Order, OrderPagination } from './order.type';

@Injectable({ providedIn: 'root' })
export class OrderService {

    private _order: BehaviorSubject<Order | null> = new BehaviorSubject(null);
    private _orders: BehaviorSubject<Order[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<OrderPagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for order
 */
    get order$(): Observable<Order> {
        return this._order.asObservable();
    }

    /**
     * Getter for orders
     */
    get orders$(): Observable<Order[]> {
        return this._orders.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<OrderPagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get orders
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getOrders(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: OrderPagination; data: Order[] }> {
        return this._httpClient.get<{ pagination: OrderPagination; data: Order[] }>('/api/orders', {
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
                this._orders.next(response.data);
            }),
        );
    }

    /**
     * Get order by id
     */
    getOrderById(id: string): Observable<Order> {
        return this.orders$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Order>('/api/orders/' + id).pipe(
                map((order) => {

                    // Set value for current order
                    this._order.next(order);

                    // Return the new contact
                    return order;
                })
            ))
        );
    }

    /**
 * Get order by id
 */
    updateOrderStatus(id: string, status: 'ManagerConfirmed' | '' = 'ManagerConfirmed') {
        return this.orders$.pipe(
            take(1),
            switchMap(() => this._httpClient.put<Order>('/api/orders/status/' + id, { status: status }).pipe(
                map((updatedOrder) => {

                    // Update current order
                    this._order.next(updatedOrder);

                    return updatedOrder;
                })
            ))
        )
    }

    /**
* Create order
*/
    createOrder(data) {
        return this.orders$.pipe(
            take(1),
            switchMap((orders) => this._httpClient.post<Order>('/api/orders', data).pipe(
                map((newOrder) => {

                    // Update order list with current page size
                    this._orders.next([newOrder, ...orders].slice(0, this._pagination.value.pageSize));

                    return newOrder;
                })
            ))
        )
    }

    /**
    * Update order
    */
    cancelOrder(id: string, data: any) {
        return this.orders$.pipe(
            take(1),
            switchMap(() => this._httpClient.put<Order>('/api/orders/status/' + id, data).pipe(
                map((updatedOrder) => {

                    // Update current order
                    this._order.next(updatedOrder);

                    return updatedOrder;
                })
            ))
        )
    }
}