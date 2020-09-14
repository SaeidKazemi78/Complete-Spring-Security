import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    MainAuthorityService,
    MainAuthorityPopupService,
    MainAuthorityComponent,
    MainAuthorityDialogComponent,
    MainAuthorityPopupComponent,
    MainAuthorityDeletePopupComponent,
    MainAuthorityDeleteDialogComponent,
    mainAuthorityRoute,
    mainAuthorityPopupRoute,
    MainAuthorityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...mainAuthorityRoute,
    ...mainAuthorityPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MainAuthorityComponent,
        MainAuthorityDialogComponent,
        MainAuthorityDeleteDialogComponent,
        MainAuthorityPopupComponent,
        MainAuthorityDeletePopupComponent,
    ],
    entryComponents: [
        MainAuthorityComponent,
        MainAuthorityDialogComponent,
        MainAuthorityPopupComponent,
        MainAuthorityDeleteDialogComponent,
        MainAuthorityDeletePopupComponent,
    ],
    providers: [
        MainAuthorityService,
        MainAuthorityPopupService,
        MainAuthorityResolvePagingParams,
    ],
    exports: [
        MainAuthorityComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayMainAuthorityModule {}
