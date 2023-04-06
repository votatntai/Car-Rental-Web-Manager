import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../../order.service';

@Component({
    selector: 'app-deny-order',
    templateUrl: 'deny-order.component.html'
})

export class DenyOrderComponent implements OnInit {

    denyForm: UntypedFormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<DenyOrderComponent>,
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