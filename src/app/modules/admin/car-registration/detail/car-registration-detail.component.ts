import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';
import { CarRegistrationService } from '../car-registration.service';
import { CarRegistration } from '../car-registration.type';

@Component({
    selector: 'app-car-registration-detail',
    templateUrl: 'car-registration-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class CarRegistrationDetailComponent implements OnInit {

    carRegistration: CarRegistration;

    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['weekday', 'startTime', 'endTime'];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _carRegistrationService: CarRegistrationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit() {
        // Subscribe value of car registration in service
        this._carRegistrationService.carRegistration$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(carRegistration => {

                // Update the car registration
                this.carRegistration = carRegistration;
                this.initialCarCalendar(carRegistration);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
    }

    private initialCarCalendar(carRegistration: CarRegistration) {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const allDays = weekdays.map(day => ({
            weekday: day,
            startTime: null,
            endTime: null,
            ...carRegistration.calendars.map(c => c.calendar).find(c => c.weekday === day)
        }));
        this.dataSource = new MatTableDataSource(allDays);
    }

}