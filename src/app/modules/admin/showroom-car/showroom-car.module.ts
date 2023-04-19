import { AgmCoreModule } from '@agm/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { MachineStatusPipeModule } from '@fuse/pipes/machine-status/machine-status-pipe.module';
import { ShowroomCarComponent } from 'app/modules/admin/showroom-car/showroom-car.component';
import { CreateMachineComponent } from './create/creare-machine.component';
import { ShowroomMachineDetailMapsViewComponent } from './detail/maps-view/machine-detail-maps-view.component';
import { ShowroomMachineDetailComponent } from './detail/showroom-machine-detail.component';
import { ShowroomMachineDetailResolver } from './detail/showroom-machine-detail.resolvers';
import { ShowroomsResolver } from './showroom-car.resolvers';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DayTranslatePipeModule } from '@fuse/pipes/day-translate/day-translate.module';

const showroomCarRoutes: Route[] = [
    {
        path: '',
        component: ShowroomCarComponent,
        resolve: {
            showroomCar: ShowroomsResolver
        },
    },
    {
        path: ':id',
        component: ShowroomMachineDetailComponent,
        resolve: {
            showroomCarDetail: ShowroomMachineDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        ShowroomCarComponent,
        ShowroomMachineDetailComponent,
        ShowroomMachineDetailMapsViewComponent,
        CreateMachineComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(showroomCarRoutes),
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatPaginatorModule,
        MachineStatusPipeModule,
        DayTranslatePipeModule,
        MatSortModule,
        MatDialogModule,
        MatSelectModule,
        FuseAlertModule,
        FuseCardModule,
        AgmCoreModule,
        MatTableModule,
        MatAutocompleteModule
    ],
})
export class ShowroomCarModule {
}
