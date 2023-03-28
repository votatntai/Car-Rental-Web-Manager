import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';
import { MachineService } from '../machine.service';
import { Machine } from '../machine.type';

@Component({
    selector: 'app-machine-detail',
    templateUrl: 'machine-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class MachineDetailComponent implements OnInit {

    machine: Machine;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _machineService: MachineService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit() {
        // Subscribe value of machine in service
        this._machineService.machine$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(machine => {
                // Update the machine
                this.machine = machine;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
    }

    // Update status for machine
    // updateMachineStatus(id: string, status: boolean) {
    //     this._fuseConfirmationService.open().afterClosed().subscribe(result => {
    //         if (result === 'confirmed') {
    //             this._machineService.updateMachineAccountStatus(id, status).subscribe();
    //         }
    //     })
    // }

}