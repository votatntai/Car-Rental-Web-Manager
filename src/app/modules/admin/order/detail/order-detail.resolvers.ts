import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';
import { Order } from '../order.type';

@Injectable({
    providedIn: 'root'
})

export class OrderDetailResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order> {
        return this._orderService.getOrderById(route.paramMap.get('id'));
    }
}
