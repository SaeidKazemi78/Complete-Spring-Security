import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ReservoirCapacityService,
    ReservoirCapacityPopupService,
    ReservoirCapacityComponent,
    ReservoirCapacityDetailComponent,
    ReservoirCapacityDialogComponent,
    ReservoirCapacityPopupComponent,
    ReservoirCapacityDeletePopupComponent,
    ReservoirCapacityDeleteDialogComponent,
    reservoirCapacityRoute,
    reservoirCapacityPopupRoute,
    ReservoirCapacityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reservoirCapacityRoute,
    ...reservoirCapacityPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReservoirCapacityComponent,
        ReservoirCapacityDetailComponent,
        ReservoirCapacityDialogComponent,
        ReservoirCapacityDeleteDialogComponent,
        ReservoirCapacityPopupComponent,
        ReservoirCapacityDeletePopupComponent,
    ],
    entryComponents: [
        ReservoirCapacityComponent,
        ReservoirCapacityDialogComponent,
        ReservoirCapacityPopupComponent,
        ReservoirCapacityDeleteDialogComponent,
        ReservoirCapacityDeletePopupComponent,
    ],
    providers: [
        ReservoirCapacityService,
        ReservoirCapacityPopupService,
        ReservoirCapacityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayReservoirCapacityModule {}
