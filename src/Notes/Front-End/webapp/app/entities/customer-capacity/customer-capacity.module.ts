import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerCapacityService,
    CustomerCapacityPopupService,
    CustomerCapacityComponent,
    CustomerCapacityDialogComponent,
    CustomerCapacityPopupComponent,
    CustomerCapacityDeletePopupComponent,
    CustomerCapacityDeleteDialogComponent,
    customerCapacityRoute,
    customerCapacityPopupRoute,
    CustomerCapacityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerCapacityRoute,
    ...customerCapacityPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerCapacityComponent,
        CustomerCapacityDialogComponent,
        CustomerCapacityDeleteDialogComponent,
        CustomerCapacityPopupComponent,
        CustomerCapacityDeletePopupComponent,
    ],
    entryComponents: [
        CustomerCapacityComponent,
        CustomerCapacityDialogComponent,
        CustomerCapacityPopupComponent,
        CustomerCapacityDeleteDialogComponent,
        CustomerCapacityDeletePopupComponent,
    ],
    providers: [
        CustomerCapacityService,
        CustomerCapacityPopupService,
        CustomerCapacityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerCapacityModule {}
