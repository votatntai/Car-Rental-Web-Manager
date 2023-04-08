import { AgmCoreModule } from '@agm/core';
import { CommonModule, DecimalPipe } from '@angular/common';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { DayTranslatePipeModule } from '@fuse/pipes/day-translate/day-translate.module';
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';
import { TimeSpanPipeModule } from '@fuse/pipes/time-span/time-span-pipe.module';
import { ModelComponent } from 'app/modules/admin/model/model.component';
import { ModelsResolver } from './model.resolvers';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateModelComponent } from './create/create-model.component';
import { UpdateModelComponent } from './update/update-model.component';

const modelRoutes: Route[] = [
    {
        path: '',
        component: ModelComponent,
        resolve: {
            model: ModelsResolver
        },
    },
];

@NgModule({
    declarations: [
        ModelComponent,
        CreateModelComponent,
        UpdateModelComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(modelRoutes),
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSortModule,
        AccountStatusPipeModule,
        TimeSpanPipeModule,
        DayTranslatePipeModule,
        MatDialogModule,
        MatSelectModule,
        FuseCardModule,
        AgmCoreModule,
        MatTableModule,
        MatAutocompleteModule,
        FuseAlertModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        DecimalPipe
    ]
})
export class ModelModule {
}
