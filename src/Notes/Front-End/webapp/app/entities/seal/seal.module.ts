import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SealService,
    SealPopupService,
    SealComponent,
    SealDialogComponent,
    SealPopupComponent,
    SealDeletePopupComponent,
    SealDeleteDialogComponent,
    sealRoute,
    sealPopupRoute,
    SealResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sealRoute,
    ...sealPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SealComponent,
        SealDialogComponent,
        SealDeleteDialogComponent,
        SealPopupComponent,
        SealDeletePopupComponent,
    ],
    entryComponents: [
        SealComponent,
        SealDialogComponent,
        SealPopupComponent,
        SealDeleteDialogComponent,
        SealDeletePopupComponent,
    ],
    providers: [
        SealService,
        SealPopupService,
        SealResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySealModule {}
