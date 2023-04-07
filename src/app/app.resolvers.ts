
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';
import { Observable, forkJoin } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _messagesService: MessagesService,
        private _navigationService: NavigationService,
        private _quickChatService: QuickChatService,
        private _shortcutsService: ShortcutsService,
        private _appService: AppService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._navigationService.get(),
            this._messagesService.getAll(),
            this._quickChatService.getChats(),
            this._shortcutsService.getAll(),
            this._appService.getNotifications()
        ]);
    }
}
