import { NgModule } from '@angular/core';
import { LocationPipe } from './location.pipe';

@NgModule({
    declarations: [
        LocationPipe
    ],
    exports: [
        LocationPipe
    ]
})
export class LocationPipeModule {
}
