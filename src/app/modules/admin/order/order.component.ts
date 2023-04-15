import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject, debounceTime, map, merge, switchMap, takeUntil } from 'rxjs';
import { OrderService } from './order.service';
import { Order, OrderPagination } from './order.type';
import { OrderStatus } from '../const/order-status.const';

@Component({
    selector: 'app-order',
    templateUrl: 'order.component.html',
    styleUrls: ['order.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})


export class OrderComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    orders$: Observable<Order[]>;

    flashMessage: 'success' | 'error' | null = null;
    message: string = null;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    isLoading: boolean = false;
    pagination: OrderPagination;
    orderStatusList = OrderStatus;
    selectedValue: string = 'all';

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _orderService: OrderService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        // Get the products
        this.orders$ = this._orderService.orders$;

        // Get the pagination
        this._orderService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: OrderPagination) => {

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
                    return this._orderService.getOrders(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value,
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
                    return this._orderService.getOrders(0, 10, 'name', 'asc', query, this.selectedValue !== 'all' ? this.selectedValue : null);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }

    onStatusChanged() {
        this._orderService.getOrders(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value,
            this.selectedValue !== 'all' ? this.selectedValue : null)
            .subscribe(a => {
                console.log(a);
                this._changeDetectorRef.markForCheck();
            });
    }
}