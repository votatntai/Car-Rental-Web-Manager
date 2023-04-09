import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarRegistration } from '../../car-registration.type';

@Component({
    selector: 'app-car-information',
    templateUrl: 'car-information.component.html'
})

export class CarInformationComponent implements OnInit {

    carRegistration: CarRegistration;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: CarRegistration,
        public matDialogRef: MatDialogRef<CarInformationComponent>,
    ) { }

    async ngOnInit() {
        this.carRegistration = this.data;
    }
}