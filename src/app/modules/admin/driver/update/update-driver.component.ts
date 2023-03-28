import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { phoneValidator } from '@fuse/validators/custom-validator';
import { Subject } from 'rxjs';
import { DriverService } from '../driver.service';
import { Driver } from '../driver.type';

@Component({
    selector: 'app-update-driver',
    templateUrl: 'update-driver.component.html'
})

export class UpdateDriverComponent implements OnInit {

    updateDriverForm: UntypedFormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Driver,
        private _driverService: DriverService,
        public matDialogRef: MatDialogRef<UpdateDriverComponent>,
        private _formBuilder: UntypedFormBuilder
    ) {

    }

    ngOnInit() {
        this.initUpdateDriverForm(this.data);
    }

    private initUpdateDriverForm(driver: Driver) {
        this.updateDriverForm = this._formBuilder.group({
            name: [driver.name, Validators.required],
            gender: [driver.gender, Validators.required],
            address: [driver.address, Validators.required],
            phone: [driver.phone, [Validators.required, phoneValidator()]],
        });
    }

    public onGenderChange(value: string) {
        this.updateDriverForm.controls['gender'].setValue(value);
    }

    public updateDriver(id: string) {
        if (this.updateDriverForm.valid) {
            this._driverService.updateDriver(id, this.updateDriverForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }
}