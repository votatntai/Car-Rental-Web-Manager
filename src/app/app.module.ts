import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { DayTranslatePipeModule } from '@fuse/pipes/day-translate/day-translate.module';
import { MachineStatusPipeModule } from '@fuse/pipes/machine-status/machine-status-pipe.module';
import { FuseConfigModule } from '@fuse/services/config';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { appConfig } from 'app/core/config/app.config';
import { CoreModule } from 'app/core/core.module';
import { mockApiServices } from 'app/mock-api';
import { environment } from '../environments/environment';
import { LayoutModule } from './layout/layout.module';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireMessagingModule,
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsApiKey,
            libraries: ['places'],
        })
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {
}