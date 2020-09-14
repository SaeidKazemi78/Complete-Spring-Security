import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CustomerOrderCapacityService,
    CustomerOrderCapacityComponent,
    CustomerOrderCapacityActiveDialogComponent,
    customerOrderCapacityRoute, customerOrderCapacityPopupRoute, CustomerOrderCapacityActivePopupComponent, CustomerOrderCapacityPopupService
} from './';

const ENTITY_STATES = [
    ...customerOrderCapacityRoute,
    ...customerOrderCapacityPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerOrderCapacityComponent,
        CustomerOrderCapacityActiveDialogComponent,
        CustomerOrderCapacityActivePopupComponent
    ],
    entryComponents: [
        CustomerOrderCapacityComponent,
        CustomerOrderCapacityActiveDialogComponent,
        CustomerOrderCapacityActivePopupComponent
    ],
    providers: [
        CustomerOrderCapacityService,
        CustomerOrderCapacityPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCustomerOrderCapacityModule {}
