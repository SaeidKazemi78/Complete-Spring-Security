import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BoundaryTagService,
    BoundaryTagPopupService,
    BoundaryTagComponent,
    BoundaryTagDialogComponent,
    BoundaryTagPopupComponent,
    BoundaryTagDeletePopupComponent,
    BoundaryTagDeleteDialogComponent,
    boundaryTagRoute,
    boundaryTagPopupRoute,
    BoundaryTagResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...boundaryTagRoute,
    ...boundaryTagPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BoundaryTagComponent,
        BoundaryTagDialogComponent,
        BoundaryTagDeleteDialogComponent,
        BoundaryTagPopupComponent,
        BoundaryTagDeletePopupComponent,
    ],
    entryComponents: [
        BoundaryTagComponent,
        BoundaryTagDialogComponent,
        BoundaryTagPopupComponent,
        BoundaryTagDeleteDialogComponent,
        BoundaryTagDeletePopupComponent,
    ],
    providers: [
        BoundaryTagService,
        BoundaryTagPopupService,
        BoundaryTagResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryTagModule {}
