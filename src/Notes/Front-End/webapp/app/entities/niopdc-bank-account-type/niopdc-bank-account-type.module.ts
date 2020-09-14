import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    NiopdcBankAccountTypeService,
    NiopdcBankAccountTypePopupService,
    NiopdcBankAccountTypeComponent,
    NiopdcBankAccountTypeDialogComponent,
    NiopdcBankAccountTypePopupComponent,
    NiopdcBankAccountTypeDeletePopupComponent,
    NiopdcBankAccountTypeDeleteDialogComponent,
    niopdcBankAccountTypeRoute,
    niopdcBankAccountTypePopupRoute,
    NiopdcBankAccountTypeResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...niopdcBankAccountTypeRoute,
    ...niopdcBankAccountTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NiopdcBankAccountTypeComponent,
        NiopdcBankAccountTypeDialogComponent,
        NiopdcBankAccountTypeDeleteDialogComponent,
        NiopdcBankAccountTypePopupComponent,
        NiopdcBankAccountTypeDeletePopupComponent,
    ],
    entryComponents: [
        NiopdcBankAccountTypeComponent,
        NiopdcBankAccountTypeDialogComponent,
        NiopdcBankAccountTypePopupComponent,
        NiopdcBankAccountTypeDeleteDialogComponent,
        NiopdcBankAccountTypeDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        NiopdcBankAccountTypeService,
        NiopdcBankAccountTypePopupService,
        NiopdcBankAccountTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayNiopdcBankAccountTypeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
