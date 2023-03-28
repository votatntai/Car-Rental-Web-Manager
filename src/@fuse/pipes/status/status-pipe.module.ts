import { NgModule } from '@angular/core';
import { AccountStatusPipe } from './status.pipe';

@NgModule({
    declarations: [
        AccountStatusPipe
    ],
    exports: [
        AccountStatusPipe
    ]
})
export class AccountStatusPipeModule {
}
