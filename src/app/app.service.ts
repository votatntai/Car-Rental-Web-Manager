import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, map, mergeMapTo, Observable, switchMap, take, tap } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { Notification, NotificationPagination } from './modules/types/notification.type';

@Injectable({ providedIn: 'root' })
export class AppService {

    private _notification: BehaviorSubject<Notification | null> = new BehaviorSubject(null);
    private _notofications: BehaviorSubject<Notification[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<NotificationPagination | null> = new BehaviorSubject(null)

    /**
    * Getter for notification
    */
    get notification$(): Observable<Notification> {
        return this._notification.asObservable();
    }

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<Notification[]> {
        return this._notofications.asObservable();
    }

    constructor(
        private _httpClient: HttpClient,
        private _messaging: AngularFireMessaging,
        private _authService: AuthService
    ) { }

    public requestPermission() {
        this._messaging.requestPermission
            .pipe(mergeMapTo(this._messaging.tokenChanges))
            .subscribe(
                (token) => {
                    var accessToken = localStorage.getItem('accessToken');
                    if (accessToken) {
                        this._authService.registerDeviceToken(token);
                    }
                },
                (error) => { console.error(error); },
            );
    }

    public listenServiceWorker() {
        this._messaging.messages.subscribe((event: any) => {
            const now: Date = new Date();
            const currentTime: string = now.toLocaleTimeString();

            var newNotification = {
                id: event.messageId,
                title: event.notification.title,
                body: event.notification.body,
                data: {
                    isRead: false,
                    createAt: currentTime,
                    type: event.data.type,
                    link: event.data.link
                }
            };

            var currentNotifications = this._notofications.getValue();
            var notifications = currentNotifications ? [newNotification, ...currentNotifications].slice(0, this._pagination.value.pageSize) : [newNotification];
            this._notofications.next(notifications);
        })
    }

    public getNotifications(pageNumber: number = 0, pageSize: number = 10, search?: string) {
        return this._httpClient.get<{ pagination: NotificationPagination; data: Notification[] }>('/api/notifications', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                name: search || ''
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._notofications.next(response.data);
            }),
        );
    }

    public markAllAsRead() {
        return this._httpClient.put('/api/notifications/make-as-read', null);
    }

    public deleteNotification(id: string) {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.delete('/api/notifications/' + id).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted product
                    const index = notifications.findIndex(item => item.id === id);

                    // Delete the product
                    notifications.splice(index, 1);

                    // Update the products
                    this._notofications.next(notifications);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }
}