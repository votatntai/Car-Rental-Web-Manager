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
import { ShowroomComponent } from 'app/modules/admin/showroom/showroom.component';
import { ShowroomsResolver } from './showroom.resolvers';
import { CreateShowroomComponent } from './create/create-showroom.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { LocationPipeModule } from '@fuse/pipes/location/location.pipe.module';

const showroomRoutes: Route[] = [
    {
        path: '',
        component: ShowroomComponent,
        resolve: {
            showroom: ShowroomsResolver
        },
    },
    // {
    //     path: ':id',
    //     component: ShowroomDetailComponent,
    //     resolve: {
    //         showroomDetail: ShowroomDetailResolver
    //     }
    // }
];

@NgModule({
    declarations: [
        ShowroomComponent,
        CreateShowroomComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(showroomRoutes),
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
        MatAutocompleteModule,
        GooglePlaceModule,
        AgmCoreModule,
        LocationPipeModule
    ],
})
export class ShowroomModule {
}
