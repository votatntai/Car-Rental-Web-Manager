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
import { CarOwnerDetailComponent } from './detail/car-owner-detail.component';
import { CarOwnerDetailResolver } from './detail/car-owner-detail.resolvers';
import { CarOwnerComponent } from './car-owner.component';
import { CarOwnersResolver } from './car-owner.resolvers';
import { AccountStatusPipeModule } from '@fuse/pipes/status/status-pipe.module';

const driverRoutes: Route[] = [
    {
        path: '',
        component: CarOwnerComponent,
        resolve: {
            driver: CarOwnersResolver
        },
    },
    {
        path: ':id',
        component: CarOwnerDetailComponent,
        resolve: {
            driverDetail: CarOwnerDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        CarOwnerComponent,
        CarOwnerDetailComponent,
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
export class CarOwnerModule {
}
