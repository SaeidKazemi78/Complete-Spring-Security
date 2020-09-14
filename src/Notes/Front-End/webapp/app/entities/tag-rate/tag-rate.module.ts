import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    TagRateService,
    TagRatePopupService,
    TagRateComponent,
    TagRateDialogComponent,
    TagRatePopupComponent,
    TagRateDeletePopupComponent,
    TagRateDeleteDialogComponent,
    tagRateRoute,
    tagRatePopupRoute,
    TagRateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tagRateRoute,
    ...tagRatePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TagRateComponent,
        TagRateDialogComponent,
        TagRateDeleteDialogComponent,
        TagRatePopupComponent,
        TagRateDeletePopupComponent,
    ],
    entryComponents: [
        TagRateComponent,
        TagRateDialogComponent,
        TagRatePopupComponent,
        TagRateDeleteDialogComponent,
        TagRateDeletePopupComponent,
    ],
    providers: [
        TagRateService,
        TagRatePopupService,
        TagRateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayTagRateModule {}
