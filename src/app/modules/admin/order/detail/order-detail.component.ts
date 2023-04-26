import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LocationSocketService } from 'app/modules/services/location-socket.service';
import { Subject, takeUntil } from 'rxjs';
import { MachineDetailMapsViewComponent } from '../../machine/detail/maps-view/machine-detail-maps-view.component';
import { TrackingComponent } from '../../machine/detail/tracking/tracking.component';
import { OrderService } from '../order.service';
import { Order } from '../order.type';
import { DenyOrderComponent } from './deny-order/deny-order.component';
import { LicenseCheckComponent } from './license-check/deny-order.component';
import { Machine } from '../../machine/machine.type';

@Component({
    selector: 'app-order-detail',
    templateUrl: 'order-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class OrderDetailComponent implements OnInit {

    order: Order;
    car: Machine;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _orderService: OrderService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _dialog: MatDialog,
        private _locationSocket: LocationSocketService
    ) { }

    ngOnInit() {
        // Subscribe value of order in service
        this._orderService.order$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {

                // Update the order
                this.order = order;

                this.car = order.orderDetails[0].car;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
    }

    // Update status for driver
    openConfirmDialog() {
        this._fuseConfirmationService.open({
            message: 'Bạn thật sự muốn xác nhận đơn hàng này chứ'
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._orderService.updateOrderStatus(this.order.id).subscribe();
            }
        })
    }

    openDenyOrderDialog() {
        this._dialog.open(DenyOrderComponent, {
            width: '480px',
            data: this.order
        })
    }

    checkLicense() {
        this._dialog.open(LicenseCheckComponent, {
            width: '1080px',
            data: this.order.customer
        })
    }

    openMapsViewDialog() {
        this._dialog.open(MachineDetailMapsViewComponent, {
            width: '1080px',
            data: this.order.orderDetails[0].car,
            autoFocus: false
        })
    }

    openTrackingModel() {
        this._dialog.open(TrackingComponent, {
            width: '1080px',
            data: this.order.orderDetails[0].car,
            autoFocus: false
        }).afterClosed().subscribe(() => {
            this._locationSocket.stopConnection();
        })
    }

}