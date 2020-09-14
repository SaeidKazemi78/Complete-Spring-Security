import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    NiopdcConfigService,
    NiopdcConfigPopupService,
    NiopdcConfigComponent,
    NiopdcConfigDialogComponent,
    NiopdcConfigPopupComponent,
    NiopdcConfigDeletePopupComponent,
    NiopdcConfigDeleteDialogComponent,
    niopdcConfigRoute,
    niopdcConfigPopupRoute,
    NiopdcConfigResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...niopdcConfigRoute,
    ...niopdcConfigPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NiopdcConfigComponent,
        NiopdcConfigDialogComponent,
        NiopdcConfigDeleteDialogComponent,
        NiopdcConfigPopupComponent,
        NiopdcConfigDeletePopupComponent,
    ],
    entryComponents: [
        NiopdcConfigComponent,
        NiopdcConfigDialogComponent,
        NiopdcConfigPopupComponent,
        NiopdcConfigDeleteDialogComponent,
        NiopdcConfigDeletePopupComponent,
    ],
    providers: [
        NiopdcConfigService,
        NiopdcConfigPopupService,
        NiopdcConfigResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayNiopdcConfigModule {}
