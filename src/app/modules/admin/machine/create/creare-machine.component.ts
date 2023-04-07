import { Component, OnInit } from '@angular/core';
import { MachineService } from '../machine.service';

@Component({
    selector: 'app-create-machine',
    templateUrl: 'create-machine.component.html'
})

export class CreareMachineComponent implements OnInit {
    constructor(
        private _machineService: MachineService,
    ) { }

    ngOnInit() { }
}