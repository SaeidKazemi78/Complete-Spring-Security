import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    FactorItemService,
    FactorItemPopupService,
    FactorItemComponent,
    FactorItemDialogComponent,
    FactorItemPopupComponent,
    FactorItemDeletePopupComponent,
    FactorItemDeleteDialogComponent,
    factorItemRoute,
    factorItemPopupRoute,
    FactorItemResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...factorItemRoute,
    ...factorItemPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FactorItemComponent,
        FactorItemDialogComponent,
        FactorItemDeleteDialogComponent,
        FactorItemPopupComponent,
        FactorItemDeletePopupComponent,
    ],
    entryComponents: [
        FactorItemComponent,
        FactorItemDialogComponent,
        FactorItemPopupComponent,
        FactorItemDeleteDialogComponent,
        FactorItemDeletePopupComponent,
    ],
    providers: [
        FactorItemService,
        FactorItemPopupService,
        FactorItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayFactorItemModule {}
