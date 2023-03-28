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

const showroomRoutes: Route[] = [
    {
        path: '',
        component: ShowroomComponent,
        // resolve: {
        //     showroom: ShowroomsResolver
        // },
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
        FuseAlertModule
    ],
})
export class ShowroomModule {
}
