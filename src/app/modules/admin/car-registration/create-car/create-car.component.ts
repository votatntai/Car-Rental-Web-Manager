import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { map, Observable, startWith } from 'rxjs';
import { Model } from '../../model/module.type';

@Component({
    selector: 'app-create-car',
    templateUrl: 'create-car.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class CreateCarComponent implements OnInit {

    models: Model[];
    carForm: UntypedFormGroup;
    filteredModels: Observable<any[]>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<CreateCarComponent>,
        private _formBuilder: UntypedFormBuilder,
    ) { }

    ngOnInit() {
        this.models = this.data.models;
        console.log(this.models);

        this.initCarForm();
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
        });

    }

    displayModel(model: Model): string {
        return model ? model.name : '';
    }

}