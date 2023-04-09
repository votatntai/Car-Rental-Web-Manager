import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { Subject, take, takeUntil } from 'rxjs';
import { ModelService } from '../../model/model.service';
import { CarRegistrationService } from '../car-registration.service';
import { CarRegistration } from '../car-registration.type';
import { CreateCarComponent } from '../create-car/create-car.component';
import { CarInformationComponent } from './car-information/car-information.component';
import { LocationSocketService } from 'app/modules/services/location-socket.service';

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
    flashMessage: 'success' | 'error' | null = null;
    message: string = null;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _carRegistrationService: CarRegistrationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog,
        private _modelService: ModelService,
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

    openCreateCarDialog() {
        this._modelService.getModels().pipe(take(1)).subscribe(response => {
            this._dialog.open(CreateCarComponent, {
                width: '1080px',
                data: {
                    carRegistration: this.carRegistration,
                    models: response.data
                },
                autoFocus: false
            }).afterClosed().subscribe(result => {
                // After dialog closed
                if (result === 'success') {
                    this.showFlashMessage(result, 'Phê duyệt nhật thành công', 3000);
                } else {
                    this.showFlashMessage(result, 'Đã có lỗi khôn mong muống vui lòng liên hệ bộ phận hổ trợ', 3000);
                }
            })
        })
    }

    private showFlashMessage(type: 'success' | 'error', message: string, time: number): void {
        this.flashMessage = type;
        this.message = message;
        this._changeDetectorRef.markForCheck();
        setTimeout(() => {
            this.flashMessage = this.message = null;
            this._changeDetectorRef.markForCheck();
        }, time);
    }

    openCarInformationDialog() {
        this._dialog.open(CarInformationComponent, {
            width: '1080px',
            data: this.carRegistration
        })
    }

}