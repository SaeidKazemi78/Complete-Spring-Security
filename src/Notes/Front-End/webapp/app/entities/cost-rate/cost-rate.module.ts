import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CostRateService,
    CostRatePopupService,
    CostRateComponent,
    CostRateDialogComponent,
    CostRatePopupComponent,
    CostRateDeletePopupComponent,
    CostRateDeleteDialogComponent,
    costRateRoute,
    costRatePopupRoute,
    CostRateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...costRateRoute,
    ...costRatePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostRateComponent,
        CostRateDialogComponent,
        CostRateDeleteDialogComponent,
        CostRatePopupComponent,
        CostRateDeletePopupComponent,
    ],
    entryComponents: [
        CostRateComponent,
        CostRateDialogComponent,
        CostRatePopupComponent,
        CostRateDeleteDialogComponent,
        CostRateDeletePopupComponent,
    ],
    providers: [
        CostRateService,
        CostRatePopupService,
        CostRateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCostRateModule {}
