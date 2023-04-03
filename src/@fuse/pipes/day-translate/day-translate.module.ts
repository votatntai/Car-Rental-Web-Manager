import { NgModule } from '@angular/core';
import { DayTranslatePipe } from './day-translate';

@NgModule({
    declarations: [
        DayTranslatePipe
    ],
    exports: [
        DayTranslatePipe
    ]
})
export class DayTranslatePipeModule {
}
