import { NgModule } from '@angular/core';
import { TimeSpanPipe } from './time-span-pipe';

@NgModule({
    declarations: [
        TimeSpanPipe
    ],
    exports: [
        TimeSpanPipe
    ]
})
export class TimeSpanPipeModule {
}
