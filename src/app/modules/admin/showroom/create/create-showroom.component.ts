import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShowroomService } from '../showroom.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
    selector: 'app-create-showroom',
    templateUrl: 'create-showroom.component.html'
})

export class CreateShowroomComponent implements OnInit {
    @ViewChild("placesRef") placesRef: GooglePlaceDirective;
    latitude: number;
    longitude: number;
    zoom: number;
    options: any = {
        types: [],
        componentRestrictions: { country: 'VN' },
    };
    createShowroomForm: UntypedFormGroup;

    constructor(
        private _showroomServive: ShowroomService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<CreateShowroomComponent>,
        private _formBuilder: UntypedFormBuilder
    ) { }

    ngOnInit() {
        this.initCreateShowroomForm();
        this.setDefaultLocation();
    }

    private initCreateShowroomForm() {
        this.createShowroomForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            location: [null, [Validators.required]],
        });
    }

    public createShowroom() {
        if (this.createShowroomForm.valid) {
            this._showroomServive.createShowroom(this.createShowroomForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }

    setDefaultLocation() {
        // Set default location is "FPT University"
        this.latitude = 10.841210501207392;
        this.longitude = 106.81019304317037;
        this.zoom = 15;
    }

    public handleAddressChange(address: Address) {
        this.latitude = address.geometry.location.lat();
        this.longitude = address.geometry.location.lng();
        this.createShowroomForm.controls['location'].setValue({
            latitude: this.latitude,
            longitude: this.longitude
        });
    }

    mapClicked($event: any): void {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.createShowroomForm.controls['location'].setValue({
            latitude: this.latitude,
            longitude: this.longitude
        });
    }
}