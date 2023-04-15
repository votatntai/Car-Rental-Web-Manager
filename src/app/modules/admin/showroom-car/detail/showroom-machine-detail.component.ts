import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { Image } from 'app/modules/types/image.type';
import { Subject, takeUntil } from 'rxjs';
import { Machine } from '../../machine/machine.type';
import { ShowroomCarService } from '../showroom-car.service';
import { ShowroomMachineDetailMapsViewComponent } from './maps-view/machine-detail-maps-view.component';

@Component({
    selector: 'app-showroom-machine-detail',
    templateUrl: 'showroom-machine-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class ShowroomMachineDetailComponent implements OnInit {

    selectedImage: Image;
    machine: Machine;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _machineService: ShowroomCarService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog,
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

    openMapsViewDialog() {
        this._dialog.open(ShowroomMachineDetailMapsViewComponent, {
            width: '1080px',
            data: this.machine,
            autoFocus: false
        })
    }

    selectImage(image: Image) {
        this.selectedImage = image;
    }

    public formData: FormData = new FormData();

    onFileSelected(event: any) {
        if (event.target.files.length > 0) {
            for (let i = 0; i < event.target.files.length; i++) {
                this.formData.append('licenses', event.target.files[i]);
            }
        }
    }

    onSubmit() {
        // Use formData to send files to server
        console.log(this.formData);
    }
}