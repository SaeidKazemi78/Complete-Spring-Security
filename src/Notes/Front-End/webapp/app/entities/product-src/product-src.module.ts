import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    ProductSrcService,
    ProductSrcPopupService,
    ProductSrcComponent,
    ProductSrcDialogComponent,
    ProductSrcPopupComponent,
    ProductSrcDeletePopupComponent,
    ProductSrcDeleteDialogComponent,
    productSrcRoute,
    productSrcPopupRoute,
    ProductSrcResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...productSrcRoute,
    ...productSrcPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductSrcComponent,
        ProductSrcDialogComponent,
        ProductSrcDeleteDialogComponent,
        ProductSrcPopupComponent,
        ProductSrcDeletePopupComponent,
    ],
    entryComponents: [
        ProductSrcComponent,
        ProductSrcDialogComponent,
        ProductSrcPopupComponent,
        ProductSrcDeleteDialogComponent,
        ProductSrcDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        ProductSrcService,
        ProductSrcPopupService,
        ProductSrcResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayProductSrcModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
