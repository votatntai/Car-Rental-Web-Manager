import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../order.service';
import { Order } from '../order.type';

@Component({
    selector: 'app-order-detail',
    templateUrl: 'order-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class OrderDetailComponent implements OnInit {

    order: Order;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _orderService: OrderService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit() {
        // Subscribe value of order in service
        this._orderService.order$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {

                // Update the order
                this.order = order;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
    }

    // Update status for order
    updateOrderStatus(id: string, status: boolean) {
        this._fuseConfirmationService.open().afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._orderService.updateOrderAccountStatus(id, status).subscribe();
            }
        })
    }

}