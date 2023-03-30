import { NgModule } from '@angular/core';
import { PaymentPipe } from './payment.pipe';

@NgModule({
    declarations: [
        PaymentPipe
    ],
    exports: [
        PaymentPipe
    ]
})
export class PaymentPipeModule {
}
