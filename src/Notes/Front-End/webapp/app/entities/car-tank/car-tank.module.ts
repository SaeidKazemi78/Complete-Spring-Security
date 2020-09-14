import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CarTankService,
    CarTankPopupService,
    CarTankComponent,
    CarTankDialogComponent,
    CarTankPopupComponent,
    CarTankDeletePopupComponent,
    CarTankDeleteDialogComponent,
    carTankRoute,
    carTankPopupRoute,
    CarTankResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...carTankRoute,
    ...carTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarTankComponent,
        CarTankDialogComponent,
        CarTankDeleteDialogComponent,
        CarTankPopupComponent,
        CarTankDeletePopupComponent,
    ],
    entryComponents: [
        CarTankComponent,
        CarTankDialogComponent,
        CarTankPopupComponent,
        CarTankDeleteDialogComponent,
        CarTankDeletePopupComponent,
    ],
    providers: [
        CarTankService,
        CarTankPopupService,
        CarTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCarTankModule {}
