import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModelService } from '../model.service';
import { Observable, map, startWith } from 'rxjs';
import { ProductionCompany } from 'app/modules/types/production-company.type';

@Component({
    selector: 'app-create-model',
    templateUrl: 'create-model.component.html'
})

export class CreateModelComponent implements OnInit {

    createModelForm: UntypedFormGroup;
    control = new FormControl();
    filteredProductionCompanies$: Observable<ProductionCompany[]>;
    productionCompanies: ProductionCompany[];
    constructor(
        private _modelServive: ModelService,
        public matDialogRef: MatDialogRef<CreateModelComponent>,
        private _formBuilder: UntypedFormBuilder
    ) { }

    ngOnInit() {
        this.initCreateModelForm();
        this._modelServive.productionCompanies$.subscribe(result => {
            this.productionCompanies = result;
        });

        this.filteredProductionCompanies$ = this.control.valueChanges.pipe(
            startWith(''),
            map(value => this.filterProductionCompanies(value))
        );
    }

    private initCreateModelForm() {
        this.createModelForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            cellingPrice: ['', [Validators.required]],
            floorPrice: ['', [Validators.required]],
            seater: ['', Validators.required],
            chassis: ['', Validators.required],
            yearOfManufacture: ['', Validators.required],
            transmissionType: ['', Validators.required],
            fuelType: ['', Validators.required],
            fuelConsumption: ['', [Validators.required]],
            productionCompanyId: ['', [Validators.required]],
        });
    }

    public onOptionSelected(event: any) {
        this.createModelForm.controls.productionCompanyId.patchValue(event.option.value.id);
    }

    public createModel() {
        if (this.createModelForm.valid) {
            this._modelServive.createModel(this.createModelForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
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