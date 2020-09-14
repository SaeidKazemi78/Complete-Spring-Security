import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CurrencyRateService,
    CurrencyRatePopupService,
    CurrencyRateComponent,
    CurrencyRateDialogComponent,
    CurrencyRatePopupComponent,
    CurrencyRateDeletePopupComponent,
    CurrencyRateDeleteDialogComponent,
    currencyRateRoute,
    currencyRatePopupRoute,
    CurrencyRateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...currencyRateRoute,
    ...currencyRatePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CurrencyRateComponent,
        CurrencyRateDialogComponent,
        CurrencyRateDeleteDialogComponent,
        CurrencyRatePopupComponent,
        CurrencyRateDeletePopupComponent,
    ],
    entryComponents: [
        CurrencyRateComponent,
        CurrencyRateDialogComponent,
        CurrencyRatePopupComponent,
        CurrencyRateDeleteDialogComponent,
        CurrencyRateDeletePopupComponent,
    ],
    providers: [
        CurrencyRateService,
        CurrencyRatePopupService,
        CurrencyRateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCurrencyRateModule {}
