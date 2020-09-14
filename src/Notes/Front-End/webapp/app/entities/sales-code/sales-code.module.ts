import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SalesCodeService,
    SalesCodePopupService,
    SalesCodeComponent,
    SalesCodeDetailComponent,
    SalesCodeDialogComponent,
    SalesCodePopupComponent,
    SalesCodeDeletePopupComponent,
    SalesCodeDeleteDialogComponent,
    salesCodeRoute,
    salesCodePopupRoute,
    SalesCodeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...salesCodeRoute,
    ...salesCodePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SalesCodeComponent,
        SalesCodeDetailComponent,
        SalesCodeDialogComponent,
        SalesCodeDeleteDialogComponent,
        SalesCodePopupComponent,
        SalesCodeDeletePopupComponent,
    ],
    entryComponents: [
        SalesCodeComponent,
        SalesCodeDialogComponent,
        SalesCodePopupComponent,
        SalesCodeDeleteDialogComponent,
        SalesCodeDeletePopupComponent,
    ],
    providers: [
        SalesCodeService,
        SalesCodePopupService,
        SalesCodeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySalesCodeModule {}
