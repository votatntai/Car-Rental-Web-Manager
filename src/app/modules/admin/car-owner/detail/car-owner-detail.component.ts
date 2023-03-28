import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';
import { CarOwnerService } from '../car-owner.service';
import { CarOwner } from '../car-owner.type';

@Component({
    selector: 'app-car-owner-detail',
    templateUrl: 'car-owner-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class CarOwnerDetailComponent implements OnInit {

    carOwner: CarOwner;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _carOwnerService: CarOwnerService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit() {
        // Subscribe value of car owner in service
        this._carOwnerService.carOwner$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(carOwner => {
                // Update the car owner
                this.carOwner = carOwner;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
    }

    // Update status for car owner
    updateCarOwnerStatus(id: string, status: boolean) {
        this._fuseConfirmationService.open().afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._carOwnerService.updateCarOwnerAccountStatus(id, status).subscribe();
            }
        })
    }

}