import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModelService } from '../model.service';
import { Observable, map, startWith } from 'rxjs';
import { ProductionCompany } from 'app/modules/types/production-company.type';
import { Model } from '../model.type';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-update-model',
    templateUrl: 'update-model.component.html'
})

export class UpdateModelComponent implements OnInit {

    model: Model;
    currentFormValue: any;
    updateModelForm: UntypedFormGroup;
    control = new FormControl();
    filteredProductionCompanies$: Observable<ProductionCompany[]>;
    productionCompanies: ProductionCompany[];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Model,
        public matDialogRef: MatDialogRef<UpdateModelComponent>,
        private _modelServive: ModelService,
        private _formBuilder: UntypedFormBuilder,
        private _decimalPipe: DecimalPipe
    ) { }

    ngOnInit() {
        this._modelServive.productionCompanies$.subscribe(result => {
            this.productionCompanies = result;
        });

        this.initUpdateModelForm();
        this.currentFormValue = this.updateModelForm.value;
        this.control.setValue(this.data.productionCompany);
        this.filteredProductionCompanies$ = this.control.valueChanges.pipe(
            startWith(this.data.productionCompany.name),
            map(value => this.filterProductionCompanies(value))
        );
    }

    private initUpdateModelForm() {
        this.updateModelForm = this._formBuilder.group({
            name: [this.data.name, [Validators.required]],
            seater: [this.data.seater, Validators.required],
            yearOfManufacture: [this.data.yearOfManufacture, Validators.required],
            cellingPrice: [this.data.cellingPrice, [Validators.required]],
            floorPrice: [this.data.floorPrice, [Validators.required]],
            chassis: [this.data.chassis, Validators.required],
            transmissionType: [this.data.transmissionType, Validators.required],
            fuelType: [this.data.fuelType, Validators.required],
            fuelConsumption: [this.data.fuelConsumption, [Validators.required]],
            productionCompanyId: [this.data.productionCompany.id, [Validators.required]],
        });
    }

    public updateModel() {
        if (this.updateModelForm.valid && !this.compareInstances(this.updateModelForm.value, this.currentFormValue)) {
            this._modelServive.updateModel(this.data.id, this.updateModelForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }

    private compareInstances(instance1: Model, instance2: Model): boolean {
        const keys = Object.keys(instance1);
        for (const key of keys) {
            if (instance1[key] !== instance2[key]) {
                return false;
            }
        }
        return true;
    }

    public onOptionSelected(event: any) {
        this.updateModelForm.controls.productionCompanyId.patchValue(event.option.value.id);
    }

    filterProductionCompanies(value: any): ProductionCompany[] {
        var filterValue;
        if (!value) {
            return this.productionCompanies;
        }
        if (value.name) {
            filterValue = value.name.toLowerCase();
        } else {
            filterValue = value.toLowerCase();
        }
        return this.productionCompanies.filter(company => company.name.toLowerCase().includes(filterValue));
    }


    displayCompany(company: ProductionCompany): string {
        return company ? company.name : '';
    }
}