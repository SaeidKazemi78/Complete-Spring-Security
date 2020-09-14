import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    UserRequestComponent,
    UserRequestDeleteDialogComponent,
    UserRequestDeletePopupComponent,
    UserRequestDialogComponent,
    UserRequestPopupComponent,
    userRequestPopupRoute,
    UserRequestPopupService,
    UserRequestResolvePagingParams,
    userRequestRoute,
    UserRequestService,
} from './';
import {NiopdcgatewayUserManagementDialogModule} from 'app/entities/user-management/user-management-dialog.module';

const ENTITY_STATES = [
    ...userRequestRoute,
    ...userRequestPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        NiopdcgatewayUserManagementDialogModule,
    ],
    declarations: [
        UserRequestComponent,
        UserRequestDialogComponent,
        UserRequestDeleteDialogComponent,
        UserRequestPopupComponent,
        UserRequestDeletePopupComponent,
    ],
    entryComponents: [
        UserRequestComponent,
        UserRequestDialogComponent,
        UserRequestPopupComponent,
        UserRequestDeleteDialogComponent,
        UserRequestDeletePopupComponent,
    ],
    providers: [
        UserRequestService,
        UserRequestPopupService,
        UserRequestResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserRequestModule {
}
