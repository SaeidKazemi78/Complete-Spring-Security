import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    TransferTypeService,
    TransferTypePopupService,
    TransferTypeComponent,
    TransferTypeDialogComponent,
    TransferTypePopupComponent,
    TransferTypeDeletePopupComponent,
    TransferTypeDeleteDialogComponent,
    transferTypeRoute,
    transferTypePopupRoute,
    TransferTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...transferTypeRoute,
    ...transferTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransferTypeComponent,
        TransferTypeDialogComponent,
        TransferTypeDeleteDialogComponent,
        TransferTypePopupComponent,
        TransferTypeDeletePopupComponent,
    ],
    entryComponents: [
        TransferTypeComponent,
        TransferTypeDialogComponent,
        TransferTypePopupComponent,
        TransferTypeDeleteDialogComponent,
        TransferTypeDeletePopupComponent,
    ],
    providers: [
        TransferTypeService,
        TransferTypePopupService,
        TransferTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTransferTypeModule {}
