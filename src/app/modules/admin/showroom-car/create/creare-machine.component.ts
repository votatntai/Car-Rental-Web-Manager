import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MachineService } from '../../machine/machine.service';
import { Model } from '../../model/model.type';

@Component({
    selector: 'app-create-machine',
    templateUrl: 'create-machine.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})

export class CreateMachineComponent implements OnInit {
    @ViewChild("placesRef") placesRef: GooglePlaceDirective;
    models: Model[];
    carForm: UntypedFormGroup;
    filteredModels: Observable<any[]>;
    fileControl = new FormControl();
    files: any[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<CreateMachineComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _machineService: MachineService,
    ) { }

    ngOnInit() {
        this.models = this.data.models;
        this.initCarForm();
    }

    initCarForm() {
        this.carForm = this._formBuilder.group({
            name: [null, [Validators.required]],
            licensePlate: [null, [Validators.required]],
            showroomId: [null, [Validators.required]],
            model: [null, [Validators.required]],
            yearOfManufacture: [null, [Validators.required]],
            transmissionType: [null, [Validators.required]],
            seater: [null, [Validators.required]],
            chassis: [null, [Validators.required]],
            fuelType: [null, [Validators.required]],
            fuelConsumption: [null, [Validators.required]],
            modelId: [null, [Validators.required]],
            additionalCharge: [null, [Validators.required]],
            carOwnerId: [null, [Validators.required]],
            location: [null, [Validators.required]],
            price: [null, [Validators.required]],
            registrationId: [null, [Validators.required]]
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
            this._machineService.createMachine(this.carForm.value).subscribe(result => {
                console.log(result);
            })
        }
    }

    onLicenseFileSelected(event: any) {
        const selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            this.files.push(selectedFiles[i]);
        }
        const formData = new FormData();
        for (let i = 0; i < this.files.length; i++) {
            formData.append('images[]', this.files[i]);
        }
    }

    onImageFileSelected(event: any) {
        const selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            this.files.push(selectedFiles[i]);
        }
        const formData = new FormData();
        for (let i = 0; i < this.files.length; i++) {
            formData.append('images[]', this.files[i]);
        }
    }
}