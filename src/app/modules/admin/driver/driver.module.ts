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
import { DriverDetailComponent } from './detail/driver-detail.component';
import { DriverDetailResolver } from './detail/driver-detail.resolvers';
import { DriverComponent } from './driver.component';
import { DriversResolver } from './driver.resolvers';
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';
import { CreateDriverComponent } from './create/create-driver.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateDriverComponent } from './update/update-driver.component';
import { FuseAlertModule } from '@fuse/components/alert';

const driverRoutes: Route[] = [
    {
        path: '',
        component: DriverComponent,
        resolve: {
            driver: DriversResolver
        },
    },
    {
        path: ':id',
        component: DriverDetailComponent,
        resolve: {
            driverDetail: DriverDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        DriverComponent,
        DriverDetailComponent,
        CreateDriverComponent,
        UpdateDriverComponent
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
        AccountStatusPipeModule,
        MatSelectModule,
        MatDialogModule,
        FuseAlertModule
    ],
})
export class DriverModule {
}
