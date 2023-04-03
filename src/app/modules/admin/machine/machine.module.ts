import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { FuseCardModule } from '@fuse/components/card';
import { DayTranslatePipeModule } from '@fuse/pipes/day-translate/day-translate.module';
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';
import { TimeSpanPipeModule } from '@fuse/pipes/time-span/time-span-pipe.module';
import { MachineComponent } from 'app/modules/admin/machine/machine.component';
import { MachineDetailComponent } from './detail/machine-detail.component';
import { MachineDetailResolver } from './detail/machine-detail.resolvers';
import { MachineDetailMapsViewComponent } from './detail/maps-view/machine-detail-maps-view.component';
import { MachinesResolver } from './machine.resolvers';

const machineRoutes: Route[] = [
    {
        path: '',
        component: MachineComponent,
        resolve: {
            machine: MachinesResolver
        },
    },
    {
        path: ':id',
        component: MachineDetailComponent,
        resolve: {
            machineDetail: MachineDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        MachineComponent,
        MachineDetailComponent,
        MachineDetailMapsViewComponent
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
        TimeSpanPipeModule,
        DayTranslatePipeModule,
        MatDialogModule,
        MatSelectModule,
        FuseAlertModule,
        FuseCardModule,
        AgmCoreModule,
        MatTableModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class MachineModule {
}
