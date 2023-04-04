import { NgModule } from '@angular/core';
import { OrderStatusPipe } from './order-status.pipe';

@NgModule({
    declarations: [
        OrderStatusPipe
    ],
    exports: [
        OrderStatusPipe
    ]
})
export class OrderStatusPipeModule {
}
