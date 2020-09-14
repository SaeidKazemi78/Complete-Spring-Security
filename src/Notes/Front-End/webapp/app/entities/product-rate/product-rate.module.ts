import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductRateService,
    ProductRatePopupService,
    ProductRateComponent,
    ProductRateDialogComponent,
    ProductRatePopupComponent,
    ProductRateDeletePopupComponent,
    ProductRateConfirmPopupComponent,
    ProductRateDeleteDialogComponent,
    ProductRateConfirmDialogComponent,
    productRateRoute,
    productRatePopupRoute,
    ProductRateResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...productRateRoute,
    ...productRatePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductRateComponent,
        ProductRateDialogComponent,
        ProductRateDeleteDialogComponent,
        ProductRateConfirmDialogComponent,
        ProductRatePopupComponent,
        ProductRateDeletePopupComponent,
        ProductRateConfirmPopupComponent,
    ],
    entryComponents: [
        ProductRateComponent,
        ProductRateDialogComponent,
        ProductRatePopupComponent,
        ProductRateDeleteDialogComponent,
        ProductRateDeletePopupComponent,
        ProductRateConfirmDialogComponent,
        ProductRateConfirmPopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        ProductRateService,
        ProductRatePopupService,
        ProductRateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductRateModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
