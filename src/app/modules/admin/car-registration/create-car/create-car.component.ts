import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { map, Observable, startWith } from 'rxjs';
import { MachineService } from '../../machine/machine.service';
import { Model } from '../../model/model.type';
import { CarRegistrationService } from '../car-registration.service';
import { CarRegistration } from '../car-registration.type';

@Component({
    selector: 'app-create-car',
    templateUrl: 'create-car.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})

export class CreateCarComponent implements OnInit {
    @ViewChild("placesRef") placesRef: GooglePlaceDirective;
    latitude: number;
    longitude: number;
    zoom: number;
    options: any = {
        types: [],
        componentRestrictions: { country: 'VN' },
    };
    models: Model[];
    carRegistration: CarRegistration;
    carForm: UntypedFormGroup;
    filteredModels: Observable<any[]>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<CreateCarComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _machineService: MachineService,
        private _carRegistrationService: CarRegistrationService
    ) { }

    ngOnInit() {
        this.models = this.data.models;
        this.carRegistration = this.data.carRegistration;
        this.initCarForm();
        this.setDefaultLocation();
    }

    initCarForm() {
        this.carForm = this._formBuilder.group({
            model: [null, [Validators.required]],
            yearOfManufacture: [null, [Validators.required]],
            transmissionType: [null, [Validators.required]],
            seater: [null, [Validators.required]],
            chassis: [null, [Validators.required]],
            fuelType: [null, [Validators.required]],
            fuelConsumption: [null, [Validators.required]],
            modelId: [null, [Validators.required]],
            additionalCharge: [this.carRegistration.additionalCharge, [Validators.required]],
            carOwnerId: [this.carRegistration.carOwner.id, [Validators.required]],
            location: [null, [Validators.required]],
            name: [this.carRegistration.name, [Validators.required]],
            price: [this.carRegistration.price, [Validators.required]],
            licensePlate: [this.carRegistration.licensePlate, [Validators.required]],
            registrationId: [this.carRegistration.id, [Validators.required]]
        });
        this.filteredModels = this.carForm.controls.model.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    private _filter(value: string): Model[] {
        const filterValue = value.toString().toLowerCase();
        return this.models.filter(model => model.name.toLowerCase().includes(filterValue));
    }

    onSelectModel(model: Model) {
        this.carForm.patchValue({
            yearOfManufacture: model.yearOfManufacture,
            transmissionType: model.transmissionType,
            chassis: model.chassis,
            seater: model.seater,
            fuelType: model.fuelType,
            fuelConsumption: model.fuelConsumption,
            modelId: model.id
        });

    }

    displayModel(model: Model): string {
        return model ? model.name : '';
    }

    createCar() {
        if (this.carForm.valid) {
            this._machineService.createMachine(this.carForm.value).subscribe(car => {
                if (car) {
                    this._carRegistrationService.updateCarRegistration(this.carRegistration.id, { isApproved: true }).subscribe(carRegistration => {
                        if (carRegistration) {
                            if (carRegistration) {
                                this.matDialogRef.close('success');
                            } else {
                                this.matDialogRef.close('error');
                            }
                        }
                    })
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
        this.carForm.controls['location'].setValue({
            latitude: this.latitude,
            longitude: this.longitude
        });
    }

    mapClicked($event: any): void {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.carForm.controls['location'].setValue({
            latitude: this.latitude,
            longitude: this.longitude
        });
    }

}