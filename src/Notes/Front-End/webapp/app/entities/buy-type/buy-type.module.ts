import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BuyTypeService,
    BuyTypePopupService,
    BuyTypeComponent,
    BuyTypeDialogComponent,
    BuyTypePopupComponent,
    BuyTypeDeletePopupComponent,
    BuyTypeDeleteDialogComponent,
    buyTypeRoute,
    buyTypePopupRoute,
    BuyTypeResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...buyTypeRoute,
    ...buyTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BuyTypeComponent,
        BuyTypeDialogComponent,
        BuyTypeDeleteDialogComponent,
        BuyTypePopupComponent,
        BuyTypeDeletePopupComponent,
    ],
    entryComponents: [
        BuyTypeComponent,
        BuyTypeDialogComponent,
        BuyTypePopupComponent,
        BuyTypeDeleteDialogComponent,
        BuyTypeDeletePopupComponent,
    ],
    providers: [
        BuyTypeService,
        BuyTypePopupService,
        BuyTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBuyTypeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }}
