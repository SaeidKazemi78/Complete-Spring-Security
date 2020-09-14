import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';

import {NiopdcgatewayUserManagementDialogModule} from 'app/entities/user-management/user-management-dialog.module';
import {userRequestRoute} from 'app/entities/user-register/user-register.route';
import {UserRegisterDialogComponent} from 'app/entities/user-register/user-register-dialog.component';
import {UserManagementService} from 'app/entities/user-management';

const ENTITY_STATES = [
    ...userRequestRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
    ],
    declarations: [
        UserRegisterDialogComponent,
    ],
    entryComponents: [
        UserRegisterDialogComponent
    ],
    providers: [
        UserManagementService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserRegisterModule {
}
