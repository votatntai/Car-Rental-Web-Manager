import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShowroomCarService } from '../../showroom-car.service';
import { Machine } from 'app/modules/admin/machine/machine.type';

@Component({
    selector: 'app-machine-detail-maps-view',
    templateUrl: 'machine-detail-maps-view.component.html'
})

export class ShowroomMachineDetailMapsViewComponent implements OnInit {

    machine: Machine;
    latitude: number;
    longitude: number;
    zoom: number;
    options: any = {
        types: [],
        componentRestrictions: { country: 'VN' },
    };
    dataSource: any;
    weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    displayedColumns: string[] = ['weekday', 'startTime', 'endTime'];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Machine,
        public matDialogRef: MatDialogRef<ShowroomMachineDetailMapsViewComponent>,
        private _machineService: ShowroomCarService
    ) { }

    ngOnInit() {
        this.machine = this.data;

        this._machineService.getMachineById(this.machine.id).subscribe(() => {
            //Get car calendar
            this._machineService.getMachineCalendarById(this.machine.id).subscribe(calendars => {
                this.machine.carCalendars = calendars;
                this.initialCarCalendar(this.machine);
            });
        });

        this.initCarLocation();
    }

    initCarLocation() {
        this.latitude = this.data.location.latitude;
        this.longitude = this.data.location.longitude;
        this.zoom = 15
    }

    private initialCarCalendar(car: Machine) {
        if (car.carCalendars) {
            const allDays = this.weekdays.map(day => ({
                weekday: day,
                startTime: 'Cả ngày',
                endTime: null,
                ...car.carCalendars.map(c => c.calendar).find(c => c.weekday === day)
            }));
            this.dataSource = allDays;
        }
    }
}