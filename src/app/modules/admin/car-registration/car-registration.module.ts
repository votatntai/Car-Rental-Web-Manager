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
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';
import { CarRegistrationComponent } from 'app/modules/admin/car-registration/car-registration.component';
import { CarRegistrationsResolver } from './car-registration.resolvers';
import { CarRegistrationDetailComponent } from './detail/car-registration-detail.component';
import { CarRegistrationDetailResolver } from './detail/car-registration-detail.resolvers';

const machineRoutes: Route[] = [
    {
        path: '',
        component: CarRegistrationComponent,
        resolve: {
            machine: CarRegistrationsResolver
        },
    },
    {
        path: ':id',
        component: CarRegistrationDetailComponent,
        resolve: {
            machineDetail: CarRegistrationDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        CarRegistrationComponent,
        CarRegistrationDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(machineRoutes),
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
        FuseAlertModule,
        MatTableModule
    ],
})
export class CarRegistrationModule {
}
