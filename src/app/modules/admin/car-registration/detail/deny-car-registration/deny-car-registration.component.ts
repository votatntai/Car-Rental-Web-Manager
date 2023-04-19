import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarRegistrationService } from '../../car-registration.service';

@Component({
    selector: 'app-deny-car-registration',
    templateUrl: 'deny-car-registration.component.html'
})

export class DenyCarRegistrationComponent implements OnInit {

    denyForm: UntypedFormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<DenyCarRegistrationComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _carRegistrationService: CarRegistrationService,
    ) { }

    ngOnInit() {
        this.initDenyForm();
    }

    initDenyForm() {
        this.denyForm = this._formBuilder.group({
            isApproved: [false, Validators.required],
            description: [null, Validators.required]
        });
    }

    denyCarRegistration() {
        if (this.denyForm.valid) {
            this._carRegistrationService.updateCarRegistration(this.data.id, this.denyForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close();
                }
            });
        }
    }
}