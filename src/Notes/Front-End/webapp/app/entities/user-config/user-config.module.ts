import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    UserConfigService,
    UserConfigPopupService,
    UserConfigComponent,
    UserConfigDialogComponent,
    UserConfigPopupComponent,
    UserConfigDeletePopupComponent,
    UserConfigDeleteDialogComponent,
    userConfigRoute,
    userConfigPopupRoute,
    UserConfigResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userConfigRoute,
    ...userConfigPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserConfigComponent,
        UserConfigDialogComponent,
        UserConfigDeleteDialogComponent,
        UserConfigPopupComponent,
        UserConfigDeletePopupComponent,
    ],
    entryComponents: [
        UserConfigComponent,
        UserConfigDialogComponent,
        UserConfigPopupComponent,
        UserConfigDeleteDialogComponent,
        UserConfigDeletePopupComponent,
    ],
    providers: [
        UserConfigService,
        UserConfigPopupService,
        UserConfigResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayUserConfigModule {}
