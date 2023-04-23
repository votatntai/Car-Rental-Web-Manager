import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, debounceTime, map, merge, switchMap, take, takeUntil } from 'rxjs';
import { MachineStatus } from '../const/machine-status.const';
import { Machine, MachinePagination } from '../machine/machine.type';
import { ShowroomCarService } from './showroom-car.service';
import { CreateMachineComponent } from './create/creare-machine.component';
import { ModelService } from '../model/model.service';
import { ShowroomService } from '../showroom/showroom.service';

@Component({
    selector: 'app-showroom-car',
    templateUrl: 'showroom-car.component.html',
    styleUrls: ['showroom-car.component.css']
})

export class ShowroomCarComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    machines$: Observable<Machine[]>;

    flashMessage: 'success' | 'error' | null = null;
    message: string = null;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    isLoading: boolean = false;
    pagination: MachinePagination;
    machineStatusList = MachineStatus;
    selectedValue: string = 'all';

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _machineService: ShowroomCarService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog,
        private _modelService: ModelService,
        private _showroomService: ShowroomService
    ) { }

    ngOnInit() {
        // Get the products
        this.machines$ = this._machineService.machines$;

        // Get the pagination
        this._machineService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: MachinePagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Search input value change
        this.subscribeSearchInput();
    }

    /**
* After view init
*/
    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true
            });

            this._paginator._intl.itemsPerPageLabel = "Số dòng mỗi trang";

            // Detect changes
            this._changeDetectorRef.detectChanges();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;
                });

            // Get products if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    return this._machineService.getMachines(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value,
                        this.selectedValue !== 'all' ? this.selectedValue : null);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    subscribeSearchInput() {
        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.isLoading = true;
                    return this._machineService.getMachines(0, 10, 'name', 'asc', query,
                        this.selectedValue !== 'all' ? this.selectedValue : null);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    onStatusChanged() {
        this._machineService.getMachines(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value,
            this.selectedValue !== 'all' ? this.selectedValue : null)
            .subscribe(a => {
                this._changeDetectorRef.markForCheck();
            });
    }

    openCreateShowroomCarDialog() {
        this._modelService.getModels().pipe(take(1)).subscribe(modelResponse => {
            this._showroomService.getShowrooms().pipe(take(1)).subscribe(showroomResponse => {
                this._dialog.open(CreateMachineComponent, {
                    width: '1080px',
                    data: {
                        models: modelResponse.data,
                        showrooms: showroomResponse.data
                    },
                    autoFocus: false
                }).afterClosed().subscribe(result => {
                    // After dialog closed
                    if (result === 'success') {
                        this.showFlashMessage(result, 'Phê duyệt nhật thành công', 3000);
                    } else if (result === 'error_duplicate') {
                        this.showFlashMessage('error', 'Biển số xe này đã được đăng ký', 3000);
                    } else {
                        this.showFlashMessage('error', 'Đã có lỗi khôn mong muống vui lòng liên hệ bộ phận hổ trợ', 3000);
                    }
                    this._changeDetectorRef.markForCheck();
                })
            })
        })
    }

    private showFlashMessage(type: 'success' | 'error', message: string, time: number): void {
        this.flashMessage = type;
        this.message = message;
        this._changeDetectorRef.markForCheck();
        setTimeout(() => {
            this.flashMessage = this.message = null;
            this._changeDetectorRef.markForCheck();
        }, time);
    }
}