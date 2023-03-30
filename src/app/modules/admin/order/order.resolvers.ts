import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from './order.service';
import { Order, OrderPagination } from './order.type';

@Injectable({
    providedIn: 'root'
})

export class OrdersResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _orderService: OrderService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: OrderPagination; data: Order[] }> {
        return this._orderService.getOrders();
    }
}
