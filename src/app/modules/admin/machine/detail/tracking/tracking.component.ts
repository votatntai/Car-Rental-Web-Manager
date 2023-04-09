import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationSocketService } from 'app/modules/services/location-socket.service';
import { Subject, takeUntil } from 'rxjs';
import { Machine } from '../../machine.type';

@Component({
    selector: 'app-tracking',
    templateUrl: 'tracking.component.html'
})

export class TrackingComponent implements OnInit {

    latitude: number;
    longitude: number;
    zoom: number;
    options: any = {
        types: [],
        componentRestrictions: { country: 'VN' },
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Machine,
        public matDialogRef: MatDialogRef<TrackingComponent>,
        private _locationSocketService: LocationSocketService
    ) { }

    ngOnInit() {
        this.initCarLocation();
        this._locationSocketService.location$.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
            if (data && data.location) {
                var location = JSON.parse(data.location);
                if (location.CarId === this.data.id) {
                    this.latitude = location.Latitude;
                    this.longitude = location.Longitude;
                }
            }
        })
        this._locationSocketService.startConnection();
        this._locationSocketService.getLocationUpdates().subscribe();
    }

    initCarLocation() {
        this.zoom = 15;
    }
}