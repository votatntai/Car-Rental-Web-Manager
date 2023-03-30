import { NgModule } from '@angular/core';
import { CalculateDaysPipe } from './days-caculate.pipe';

@NgModule({
    declarations: [
        CalculateDaysPipe
    ],
    exports: [
        CalculateDaysPipe
    ]
})
export class CalculateDaysPipeModule {
}
