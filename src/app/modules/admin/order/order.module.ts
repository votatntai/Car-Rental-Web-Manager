import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { CalculateDaysPipeModule } from '@fuse/pipes/days-calculate/days-caculate-pipe.module';
import { PaymentPipeModule } from '@fuse/pipes/payment/payment-pipe.module';
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';
import { OrderComponent } from 'app/modules/admin/order/order.component';
import { OrderDetailComponent } from './detail/order-detail.component';
import { OrderDetailResolver } from './detail/order-detail.resolvers';
import { OrdersResolver } from './order.resolvers';

const orderRoutes: Route[] = [
    {
        path: '',
        component: OrderComponent,
        resolve: {
            order: OrdersResolver
        },
    },
    {
        path: ':id',
        component: OrderDetailComponent,
        resolve: {
            orderDetail: OrderDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        OrderComponent,
        OrderDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(orderRoutes),
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        AccountStatusPipeModule,
        CalculateDaysPipeModule,
        PaymentPipeModule,
        MatDialogModule,
        MatSelectModule,
        FuseAlertModule,
        FuseCardModule
    ],
})
export class OrderModule {
}
