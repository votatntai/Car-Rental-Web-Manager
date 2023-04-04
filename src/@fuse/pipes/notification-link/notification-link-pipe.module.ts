import { NgModule } from '@angular/core';
import { NotificationLinksPipe } from './notification-link.pipe';

@NgModule({
    declarations: [
        NotificationLinksPipe
    ],
    exports: [
        NotificationLinksPipe
    ]
})
export class NotificationLinksPipeModule {
}
