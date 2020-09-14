import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CarTagService,
    CarTagPopupService,
    CarTagComponent,
    CarTagDialogComponent,
    CarTagPopupComponent,
    CarTagDeletePopupComponent,
    CarTagDeleteDialogComponent,
    carTagRoute,
    carTagPopupRoute,
    CarTagResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...carTagRoute,
    ...carTagPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarTagComponent,
        CarTagDialogComponent,
        CarTagDeleteDialogComponent,
        CarTagPopupComponent,
        CarTagDeletePopupComponent,
    ],
    entryComponents: [
        CarTagComponent,
        CarTagDialogComponent,
        CarTagPopupComponent,
        CarTagDeleteDialogComponent,
        CarTagDeletePopupComponent,
    ],
    providers: [
        CarTagService,
        CarTagPopupService,
        CarTagResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCarTagModule {}
