import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, take, takeUntil } from 'rxjs';
import { ManagerService } from '../manager.service';
import { Manager } from '../manager.type';

@Component({
    selector: 'app-manager-detail',
    templateUrl: 'manager-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class ManagerDetailComponent implements OnInit {

    manager: Manager;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _managerService: ManagerService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
    ) { }

    ngOnInit() {
        // Subscribe value of manager in service
        this._managerService.manager$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(manager => {
                // Update the manager
                this.manager = manager;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
    }

    // Update status for manager
    updateManagerStatus(id: string, status: boolean) {
        this._fuseConfirmationService.open().afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._managerService.updateManagerStatus(id, status).subscribe();
            }
        })
    }

}