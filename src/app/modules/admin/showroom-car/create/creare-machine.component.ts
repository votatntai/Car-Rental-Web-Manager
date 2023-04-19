import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { MachineService } from '../../machine/machine.service';
import { Model } from '../../model/model.type';
import { Showroom } from '../../showroom/showroom.type';
import { VnLicensePlateValidator } from '@fuse/validators/custom-validator';
import { ShowroomCarService } from '../showroom-car.service';

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
    showrooms: Showroom[];
    carForm: UntypedFormGroup;
    filteredModels: Observable<any[]>;
    filteredShowrooms: Observable<any[]>;

    fileControl = new FormControl();
    imgFiles: any[] = [];
    licenseFiles: any[] = [];

    formData: FormData = new FormData();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<CreateMachineComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _showroomCarService: ShowroomCarService,
    ) { }

    ngOnInit() {
        this.models = this.data.models;
        this.showrooms = this.data.showrooms;
        this.initCarForm();
    }

    initCarForm() {
        this.carForm = this._formBuilder.group({
            name: [null, [Validators.required]],
            licensePlate: [null, [Validators.required, VnLicensePlateValidator()]],
            showroomId: [null, [Validators.required]],
            showroom: [null],
            model: [null],
            yearOfManufacture: [null, [Validators.required]],
            transmissionType: [null, [Validators.required]],
            seater: [null, [Validators.required]],
            chassis: [null, [Validators.required]],
            fuelType: [null, [Validators.required]],
            fuelConsumption: [null, [Validators.required]],
            modelId: [null, [Validators.required]],
            price: [null, [Validators.required]],
        });
        this.filteredModels = this.carForm.controls.model.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
        this.filteredShowrooms = this.carForm.controls.showroom.valueChanges.pipe(
            startWith(''),
            map(value => this._filterShowroom(value))
        );
    }

    private _filter(value: string): Model[] {
        const filterValue = value.toString().toLowerCase();
        return this.models.filter(model => model.name.toLowerCase().includes(filterValue));
    }

    private _filterShowroom(value: string): Showroom[] {
        const filterValue = value.toString().toLowerCase();
        return this.showrooms.filter(showroom => showroom.name.toLowerCase().includes(filterValue));
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

    onSelectShowroom(showroom: Showroom) {
        this.carForm.patchValue({
            showroomId: showroom.id,
        });
    }

    displayModel(model: Model): string {
        return model ? model.name : '';
    }

    displayShowroom(showroom: Showroom): string {
        return showroom ? showroom.name : '';
    }

    createCar() {
        if (this.carForm.valid) {
            this._showroomCarService.createShowroomMachine(this.carForm.value, this.formData).subscribe(result => {
                this.matDialogRef.close();
            })
        }
    }

    onLicenseFileSelected(event: any) {
        const selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            this.licenseFiles.push(selectedFiles[i]);
        }
        for (let i = 0; i < this.licenseFiles.length; i++) {
            this.formData.append('licenses', this.licenseFiles[i], this.licenseFiles[i].name);
        }
    }

    onImageFileSelected(event: any) {
        const selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            this.imgFiles.push(selectedFiles[i]);
        }
        for (let i = 0; i < this.imgFiles.length; i++) {
            this.formData.append('images', this.imgFiles[i], this.imgFiles[i].name);
        }
    }
}