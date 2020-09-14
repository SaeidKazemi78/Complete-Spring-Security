import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductRateDifferencePaymentService,
    ProductRateDifferencePaymentPopupService,
    ProductRateDifferencePaymentComponent,
    ProductRateDifferencePaymentDetailComponent,
    ProductRateDifferencePaymentDialogComponent,
    ProductRateDifferencePaymentPopupComponent,
    ProductRateDifferencePaymentDeletePopupComponent,
    ProductRateDifferencePaymentDeleteDialogComponent,
    productRateDifferencePaymentRoute,
    productRateDifferencePaymentPopupRoute,
    ProductRateDifferencePaymentResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productRateDifferencePaymentRoute,
    ...productRateDifferencePaymentPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductRateDifferencePaymentComponent,
        ProductRateDifferencePaymentDetailComponent,
        ProductRateDifferencePaymentDialogComponent,
        ProductRateDifferencePaymentDeleteDialogComponent,
        ProductRateDifferencePaymentPopupComponent,
        ProductRateDifferencePaymentDeletePopupComponent,
    ],
    entryComponents: [
        ProductRateDifferencePaymentComponent,
        ProductRateDifferencePaymentDialogComponent,
        ProductRateDifferencePaymentPopupComponent,
        ProductRateDifferencePaymentDeleteDialogComponent,
        ProductRateDifferencePaymentDeletePopupComponent,
    ],
    providers: [
        ProductRateDifferencePaymentService,
        ProductRateDifferencePaymentPopupService,
        ProductRateDifferencePaymentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductRateDifferencePaymentModule {}
