import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    SellContractProductService,
    SellContractProductPopupService,
    SellContractProductComponent,
    SellContractProductDialogComponent,
    SellContractProductPopupComponent,
    SellContractProductDeletePopupComponent,
    SellContractProductDeleteDialogComponent,
    sellContractProductRoute,
    sellContractProductPopupRoute,
    SellContractProductResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...sellContractProductRoute,
    ...sellContractProductPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SellContractProductComponent,
        SellContractProductDialogComponent,
        SellContractProductDeleteDialogComponent,
        SellContractProductPopupComponent,
        SellContractProductDeletePopupComponent,
    ],
    entryComponents: [
        SellContractProductComponent,
        SellContractProductDialogComponent,
        SellContractProductPopupComponent,
        SellContractProductDeleteDialogComponent,
        SellContractProductDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        SellContractProductService,
        SellContractProductPopupService,
        SellContractProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellContractProductModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
