import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    UserManagementComponent,
    userManagementPopupRoute,
    UserManagementPopupService,
    UserManagementResolvePagingParams,
    userManagementRoute,
    UserManagementService,
} from './';
import {NiopdcgatewayUserRefuelCenterModule} from 'app/entities/ao-entities/user-refuel-center/user-refuel-center.module';
import {NiopdcgatewayUserManagementDialogModule} from 'app/entities/user-management/user-management-dialog.module';

const ENTITY_STATES = [
    ...userManagementRoute,
    ...userManagementPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        NiopdcgatewayUserRefuelCenterModule,
        NiopdcgatewayUserManagementDialogModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserManagementComponent,
    ],
    entryComponents: [
        UserManagementComponent,
    ],
    providers: [
        UserManagementService,
        UserManagementPopupService,
        UserManagementResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserManagementModule {
}
