import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SealUseService,
    SealUsePopupService,
    SealUseComponent,
    SealUseDetailComponent,
    SealUseDialogComponent,
    SealUsePopupComponent,
    SealUseDeletePopupComponent,
    SealUseDeleteDialogComponent,
    sealUseRoute,
    sealUsePopupRoute,
    SealUseResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sealUseRoute,
    ...sealUsePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SealUseComponent,
        SealUseDetailComponent,
        SealUseDialogComponent,
        SealUseDeleteDialogComponent,
        SealUsePopupComponent,
        SealUseDeletePopupComponent,
    ],
    entryComponents: [
        SealUseComponent,
        SealUseDialogComponent,
        SealUsePopupComponent,
        SealUseDeleteDialogComponent,
        SealUseDeletePopupComponent,
    ],
    providers: [
        SealUseService,
        SealUsePopupService,
        SealUseResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySealUseModule {}
