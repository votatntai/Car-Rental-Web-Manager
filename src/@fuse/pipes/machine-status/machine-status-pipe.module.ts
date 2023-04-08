import { NgModule } from '@angular/core';
import { MachineStatusPipe } from './machine-status.pipe';

@NgModule({
    declarations: [
        MachineStatusPipe
    ],
    exports: [
        MachineStatusPipe
    ]
})
export class MachineStatusPipeModule {
}
