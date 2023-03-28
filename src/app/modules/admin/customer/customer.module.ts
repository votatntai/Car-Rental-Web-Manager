import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomerDetailComponent } from './detail/customer-detail.component';
import { CustomerDetailResolver } from './detail/customer-detail.resolvers';
import { CustomerComponent } from './customer.component';
import { CustomersResolver } from './customer.resolvers';
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';

const driverRoutes: Route[] = [
    {
        path: '',
        component: CustomerComponent,
        resolve: {
            driver: CustomersResolver
        },
    },
    {
        path: ':id',
        component: CustomerDetailComponent,
        resolve: {
            driverDetail: CustomerDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        CustomerComponent,
        CustomerDetailComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(driverRoutes),
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        AccountStatusPipeModule
    ],
})
export class CustomerModule {
}
