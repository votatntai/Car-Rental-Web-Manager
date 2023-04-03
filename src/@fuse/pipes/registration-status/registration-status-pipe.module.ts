import { NgModule } from '@angular/core';
import { RegistrationStatussPipe } from './registration-status.pipe';

@NgModule({
    declarations: [
        RegistrationStatussPipe
    ],
    exports: [
        RegistrationStatussPipe
    ]
})
export class RegistrationStatusPipeModule {
}
