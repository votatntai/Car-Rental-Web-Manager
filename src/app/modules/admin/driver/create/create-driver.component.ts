import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { confirmPasswordValidator, passwordValidator, phoneValidator, usernameValidator } from '@fuse/validators/custom-validator';
import { DriverService } from '../driver.service';

@Component({
    selector: 'app-create-driver',
    templateUrl: 'create-driver.component.html'
})

export class CreateDriverComponent implements OnInit {

    createDriverForm: UntypedFormGroup;

    constructor(
        private _driverServive: DriverService,
        public matDialogRef: MatDialogRef<CreateDriverComponent>,
        private _formBuilder: UntypedFormBuilder
    ) { }

    ngOnInit() {
        this.initCreateDriverForm();
    }

    private initCreateDriverForm() {
        this.createDriverForm = this._formBuilder.group({
            username: ['', [Validators.required, usernameValidator()]],
            password: ['', [Validators.required, passwordValidator()]],
            confirmPassword: [''],
            name: ['', Validators.required],
            address: ['', Validators.required],
            bankName: ['', Validators.required],
            bankAccountNumber: ['', Validators.required],
            gender: ['', Validators.required],
            phone: ['', [Validators.required, phoneValidator()]],
        });
        this.createDriverForm.get('confirmPassword').setValidators([
            Validators.required,
            confirmPasswordValidator(this.createDriverForm.get('password'))
        ]);
    }

    public onGenderChange(value: string) {
        this.createDriverForm.controls['gender'].setValue(value);
    }

    public createDriver() {
        if (this.createDriverForm.valid) {
            this._driverServive.createDriver(this.createDriverForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }
}