import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { phoneValidator } from '@fuse/validators/custom-validator';
import { ManagerService } from '../manager.service';
import { Manager } from '../manager.type';

@Component({
    selector: 'app-update-manager',
    templateUrl: 'update-manager.component.html'
})

export class UpdateManagerComponent implements OnInit {

    updateManagerForm: UntypedFormGroup;
    flashMessage: 'success' | 'error' | null = null;
    message: string = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Manager,
        private _managerService: ManagerService,
        public matDialogRef: MatDialogRef<UpdateManagerComponent>,
        private _formBuilder: UntypedFormBuilder
    ) {

    }

    ngOnInit() {
        this.initUpdateManagerForm(this.data);
    }

    private initUpdateManagerForm(manager: Manager) {
        this.updateManagerForm = this._formBuilder.group({
            name: [manager.name, Validators.required],
            gender: [manager.gender, Validators.required],
            phone: [manager.phone, [Validators.required, phoneValidator()]],
        });
    }

    public onGenderChange(value: string) {
        this.updateManagerForm.controls['gender'].setValue(value);
    }

    public updateManager(id: string) {
        if (this.updateManagerForm.valid) {
            this._managerService.updateManager(id, this.updateManagerForm.value).subscribe(manager => {
                if (manager) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }
}