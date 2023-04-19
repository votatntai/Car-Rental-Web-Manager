import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject, debounceTime, map, merge, switchMap, takeUntil } from 'rxjs';
import { CreateShowroomComponent } from './create/create-showroom.component';
import { ShowroomService } from './showroom.service';
import { Showroom, ShowroomPagination } from './showroom.type';

@Component({
    selector: 'app-showroom',
    templateUrl: 'showroom.component.html',
    styleUrls: ['showroom.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class ShowroomComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    showrooms$: Observable<Showroom[]>;

    flashMessage: 'success' | 'error' | null = null;
    message: string = null;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    isLoading: boolean = false;
    pagination: ShowroomPagination;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _showroomService: ShowroomService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        // Get the products
        this.showrooms$ = this._showroomService.showrooms$;

        // Get the pagination
        this._showroomService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: ShowroomPagination) => {

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

            // If the user changes the sort showroom...
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
                    return this._showroomService.getShowrooms(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value);
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
                    return this._showroomService.getShowrooms(0, 10, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    openCreateShowroomDialog() {
        this._dialog.open(CreateShowroomComponent, {
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

    // openUpdateShowroomDialog(showroom: Showroom) {
    //     this._dialog.open(UpdateShowroomComponent, {
    //         width: '720px',
    //         data: showroom
    //     }).afterClosed().subscribe(result => {
    //         // After dialog closed
    //         if (result === 'success') {
    //             this.showFlashMessage(result, 'Cập nhật thành công', 3000);
    //         } else {
    //             this.showFlashMessage(result, 'Đã có lỗi xảy ra', 3000);
    //         }
    //     })
    // }

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