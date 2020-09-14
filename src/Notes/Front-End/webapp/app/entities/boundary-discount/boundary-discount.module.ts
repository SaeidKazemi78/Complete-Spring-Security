import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BoundaryDiscountService,
    BoundaryDiscountPopupService,
    BoundaryDiscountComponent,
    BoundaryDiscountDialogComponent,
    BoundaryDiscountPopupComponent,
    BoundaryDiscountDeletePopupComponent,
    BoundaryDiscountDeleteDialogComponent,
    boundaryDiscountRoute,
    boundaryDiscountPopupRoute,
    BoundaryDiscountResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...boundaryDiscountRoute,
    ...boundaryDiscountPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BoundaryDiscountComponent,
        BoundaryDiscountDialogComponent,
        BoundaryDiscountDeleteDialogComponent,
        BoundaryDiscountPopupComponent,
        BoundaryDiscountDeletePopupComponent,
    ],
    entryComponents: [
        BoundaryDiscountComponent,
        BoundaryDiscountDialogComponent,
        BoundaryDiscountPopupComponent,
        BoundaryDiscountDeleteDialogComponent,
        BoundaryDiscountDeletePopupComponent,
    ],
    providers: [
        BoundaryDiscountService,
        BoundaryDiscountPopupService,
        BoundaryDiscountResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryDiscountModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
