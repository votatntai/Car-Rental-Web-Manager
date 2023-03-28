import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { confirmPasswordValidator, passwordValidator, phoneValidator, usernameValidator } from '@fuse/validators/custom-validator';
import { ManagerService } from '../manager.service';

@Component({
    selector: 'app-create-manager',
    templateUrl: 'create-manager.component.html'
})

export class CreateManagerComponent implements OnInit {

    createManagerForm: UntypedFormGroup;

    constructor(
        private _managerServive: ManagerService,
        public matDialogRef: MatDialogRef<CreateManagerComponent>,
        private _formBuilder: UntypedFormBuilder
    ) { }

    ngOnInit() {
        this.initCreateManagerForm();
    }

    private initCreateManagerForm() {
        this.createManagerForm = this._formBuilder.group({
            username: ['', [Validators.required, usernameValidator()]],
            password: ['', [Validators.required, passwordValidator()]],
            confirmPassword: [''],
            name: ['', Validators.required],
            gender: ['', Validators.required],
            phone: ['', [Validators.required, phoneValidator()]],
        });
        this.createManagerForm.get('confirmPassword').setValidators([
            Validators.required,
            confirmPasswordValidator(this.createManagerForm.get('password'))
        ]);
    }

    public onGenderChange(value: string) {
        this.createManagerForm.controls['gender'].setValue(value);
    }

    public createManager() {
        if (this.createManagerForm.valid) {
            this._managerServive.createManager(this.createManagerForm.value).subscribe(manager => {
                if (manager) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }
}