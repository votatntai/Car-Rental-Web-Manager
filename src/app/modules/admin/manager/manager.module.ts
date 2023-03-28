import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ManagerComponent } from 'app/modules/admin/manager/manager.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ManagersResolver } from './manager.resolvers';
import { MatSortModule } from '@angular/material/sort';
import { ManagerDetailComponent } from './detail/manager-detail.component';
import { ManagerDetailResolver } from './detail/manager-detail.resolvers';
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';
import { CreateManagerComponent } from './create/create-manager.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UpdateManagerComponent } from './update/update-manager.component';
import { FuseAlertModule } from '@fuse/components/alert';

const managerRoutes: Route[] = [
    {
        path: '',
        component: ManagerComponent,
        resolve: {
            manager: ManagersResolver
        },
    },
    {
        path: ':id',
        component: ManagerDetailComponent,
        resolve: {
            managerDetail: ManagerDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        ManagerComponent,
        ManagerDetailComponent,
        CreateManagerComponent,
        UpdateManagerComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(managerRoutes),
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
export class ManagerModule {
}
