import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    CarRfIdService,
    CarRfIdPopupService,
    CarRfIdComponent,
    CarRfIdDialogComponent,
    CarRfIdPopupComponent,
    CarRfIdDeletePopupComponent,
    CarRfIdDeleteDialogComponent,
    carRfIdRoute,
    carRfIdPopupRoute,
    CarRfIdResolvePagingParams,
    AllocateCarRfIdDialogComponent,
    ActiveCarRfIdPopupComponent,
    ActiveCarRfIdDialogComponent,
    CarRfIdUnAllocatePopupComponent,
    CarRfIdUnAllocateDialogComponent,
} from './';
import {AllocateCarRfIdPopupComponent} from 'app/entities/car-rf-id/allocate-car-rf-id-dialog.component';

const ENTITY_STATES = [
    ...carRfIdRoute,
    ...carRfIdPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarRfIdComponent,
        CarRfIdDialogComponent,
        AllocateCarRfIdDialogComponent,
        AllocateCarRfIdPopupComponent,
        CarRfIdDeleteDialogComponent,
        CarRfIdUnAllocatePopupComponent,
        CarRfIdUnAllocateDialogComponent,
        CarRfIdPopupComponent,
        CarRfIdDeletePopupComponent,
        ActiveCarRfIdPopupComponent,
        ActiveCarRfIdDialogComponent
    ],
    entryComponents: [
        CarRfIdComponent,
        CarRfIdDialogComponent,
        AllocateCarRfIdDialogComponent,
        AllocateCarRfIdPopupComponent,
        CarRfIdPopupComponent,
        CarRfIdUnAllocatePopupComponent,
        CarRfIdUnAllocateDialogComponent,
        CarRfIdDeleteDialogComponent,
        CarRfIdDeletePopupComponent,
        ActiveCarRfIdPopupComponent,
        ActiveCarRfIdDialogComponent
    ],
    providers: [
        CarRfIdService,
        CarRfIdPopupService,
        CarRfIdResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCarRfIdModule {}
