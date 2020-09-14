import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerScoreService,
    CustomerScorePopupService,
    CustomerScoreComponent,
    CustomerScoreDialogComponent,
    CustomerScorePopupComponent,
    CustomerScoreDeletePopupComponent,
    CustomerScoreDeleteDialogComponent,
    customerScoreRoute,
    customerScorePopupRoute,
    CustomerScoreResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerScoreRoute,
    ...customerScorePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerScoreComponent,
        CustomerScoreDialogComponent,
        CustomerScoreDeleteDialogComponent,
        CustomerScorePopupComponent,
        CustomerScoreDeletePopupComponent,
    ],
    entryComponents: [
        CustomerScoreComponent,
        CustomerScoreDialogComponent,
        CustomerScorePopupComponent,
        CustomerScoreDeleteDialogComponent,
        CustomerScoreDeletePopupComponent,
    ],
    providers: [
        CustomerScoreService,
        CustomerScorePopupService,
        CustomerScoreResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerScoreModule {}
