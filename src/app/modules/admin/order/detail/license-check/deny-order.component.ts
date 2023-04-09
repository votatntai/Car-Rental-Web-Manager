import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'app/modules/admin/customer/customer.type';
import { OrderService } from '../../order.service';

@Component({
    selector: 'app-license-check',
    templateUrl: 'license-check.component.html'
})

export class LicenseCheckComponent implements OnInit {

    denyForm: UntypedFormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Customer,
        public matDialogRef: MatDialogRef<LicenseCheckComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _orderService: OrderService
    ) { }

    ngOnInit() {
        this.initDenyForm();
    }

    initDenyForm() {
        this.denyForm = this._formBuilder.group({
            status: ['Canceled', Validators.required],
            description: [null, Validators.required]
        });
    }

    denyOrder() {
        if (this.denyForm.valid) {
            this._orderService.cancelOrder(this.data.id, this.denyForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close();
                }
            });
        }
    }
}