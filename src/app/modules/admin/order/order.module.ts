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
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';
import { OrderComponent } from 'app/modules/admin/order/order.component';

const orderRoutes: Route[] = [
    {
        path: '',
        component: OrderComponent,
        // resolve: {
        //     order: OrdersResolver
        // },
    },
    // {
    //     path: ':id',
    //     component: OrderDetailComponent,
    //     resolve: {
    //         orderDetail: OrderDetailResolver
    //     }
    // }
];

@NgModule({
    declarations: [
        OrderComponent,
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
        MatDialogModule,
        MatSelectModule,
        FuseAlertModule
    ],
})
export class OrderModule {
}
