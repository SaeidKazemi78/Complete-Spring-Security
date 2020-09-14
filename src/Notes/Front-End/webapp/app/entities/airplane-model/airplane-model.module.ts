import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    AirplaneModelService,
    AirplaneModelPopupService,
    AirplaneModelComponent,
    AirplaneModelDetailComponent,
    AirplaneModelDialogComponent,
    AirplaneModelPopupComponent,
    AirplaneModelDeletePopupComponent,
    AirplaneModelDeleteDialogComponent,
    airplaneModelRoute,
    airplaneModelPopupRoute,
    AirplaneModelResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...airplaneModelRoute,
    ...airplaneModelPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AirplaneModelComponent,
        AirplaneModelDetailComponent,
        AirplaneModelDialogComponent,
        AirplaneModelDeleteDialogComponent,
        AirplaneModelPopupComponent,
        AirplaneModelDeletePopupComponent,
    ],
    entryComponents: [
        AirplaneModelComponent,
        AirplaneModelDialogComponent,
        AirplaneModelPopupComponent,
        AirplaneModelDeleteDialogComponent,
        AirplaneModelDeletePopupComponent,
    ],
    providers: [
        AirplaneModelService,
        AirplaneModelPopupService,
        AirplaneModelResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAirplaneModelModule {}
