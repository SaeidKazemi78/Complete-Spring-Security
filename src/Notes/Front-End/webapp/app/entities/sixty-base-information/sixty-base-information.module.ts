import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SixtyBaseInformationService,
    SixtyBaseInformationPopupService,
    SixtyBaseInformationComponent,
    SixtyBaseInformationDialogComponent,
    SixtyBaseInformationPopupComponent,
    SixtyBaseInformationDeletePopupComponent,
    SixtyBaseInformationDeleteDialogComponent,
    sixtyBaseInformationRoute,
    sixtyBaseInformationPopupRoute,
    SixtyBaseInformationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sixtyBaseInformationRoute,
    ...sixtyBaseInformationPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SixtyBaseInformationComponent,
        SixtyBaseInformationDialogComponent,
        SixtyBaseInformationDeleteDialogComponent,
        SixtyBaseInformationPopupComponent,
        SixtyBaseInformationDeletePopupComponent,
    ],
    entryComponents: [
        SixtyBaseInformationComponent,
        SixtyBaseInformationDialogComponent,
        SixtyBaseInformationPopupComponent,
        SixtyBaseInformationDeleteDialogComponent,
        SixtyBaseInformationDeletePopupComponent,
    ],
    providers: [
        SixtyBaseInformationService,
        SixtyBaseInformationPopupService,
        SixtyBaseInformationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySixtyBaseInformationModule {}
