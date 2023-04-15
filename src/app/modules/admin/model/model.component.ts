import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject, debounceTime, map, merge, switchMap, take, takeUntil } from 'rxjs';
import { CreateModelComponent } from './create/create-model.component';
import { ModelService } from './model.service';
import { Model, ModelPagination } from './model.type';
import { UpdateModelComponent } from './update/update-model.component';

@Component({
    selector: 'app-model',
    templateUrl: 'model.component.html',
    styleUrls: ['model.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class ModelComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    models$: Observable<Model[]>;

    flashMessage: 'success' | 'error' | null = null;
    message: string = null;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    isLoading: boolean = false;
    pagination: ModelPagination;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _modelService: ModelService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        // Get the products
        this.models$ = this._modelService.models$;

        // Get the pagination
        this._modelService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: ModelPagination) => {

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

            // If the user changes the sort model...
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
                    return this._modelService.getModels(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value);
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
                    return this._modelService.getModels(0, 10, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    openCreateModelDialog() {
        this._dialog.open(CreateModelComponent, {
            width: '720px'
        }).afterClosed().subscribe(result => {
            // After dialog closed
            if (result === 'success') {
                this.showFlashMessage(result, 'Tạo mới thành công', 3000);
            } else {
                this.showFlashMessage(result, 'Đã có lỗi xảy ra', 3000);
            }
        })
    }

    openUpdateModelDialog(model: Model) {
        this._dialog.open(UpdateModelComponent, {
            width: '720px',
            data: model
        }).afterClosed().subscribe(result => {
            // After dialog closed
            if (result === 'success') {
                this.showFlashMessage(result, 'Cập nhật thành công', 3000);
            } else {
                this.showFlashMessage(result, 'Đã có lỗi xảy ra', 3000);
            }
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