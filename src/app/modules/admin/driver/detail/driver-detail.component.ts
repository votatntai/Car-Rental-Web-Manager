import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';
import { DriverService } from '../driver.service';
import { Driver } from '../driver.type';

@Component({
    selector: 'app-driver-detail',
    templateUrl: 'driver-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class DriverDetailComponent implements OnInit {

    driver: Driver;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _driverService: DriverService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit() {
        // Subscribe value of driver in service
        this._driverService.driver$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(driver => {
                // Update the driver
                this.driver = driver;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
    }

    // Update status for driver
    updateDriverStatus(id: string, status: boolean) {
        this._fuseConfirmationService.open().afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._driverService.updateDriverAccountStatus(id, status).subscribe();
            }
        })
    }

}