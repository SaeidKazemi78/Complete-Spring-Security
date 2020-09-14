import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    NiopdcBankAccountService,
    NiopdcBankAccountPopupService,
    NiopdcBankAccountComponent,
    NiopdcBankAccountDialogComponent,
    NiopdcBankAccountPopupComponent,
    NiopdcBankAccountDeletePopupComponent,
    NiopdcBankAccountDeleteDialogComponent,
    niopdcBankAccountRoute,
    niopdcBankAccountPopupRoute,
    NiopdcBankAccountResolvePagingParams,
} from './';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';

const ENTITY_STATES = [
    ...niopdcBankAccountRoute,
    ...niopdcBankAccountPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NiopdcBankAccountComponent,
        NiopdcBankAccountDialogComponent,
        NiopdcBankAccountDeleteDialogComponent,
        NiopdcBankAccountPopupComponent,
        NiopdcBankAccountDeletePopupComponent,
    ],
    entryComponents: [
        NiopdcBankAccountComponent,
        NiopdcBankAccountDialogComponent,
        NiopdcBankAccountPopupComponent,
        NiopdcBankAccountDeleteDialogComponent,
        NiopdcBankAccountDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        NiopdcBankAccountService,
        NiopdcBankAccountPopupService,
        NiopdcBankAccountResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayNiopdcBankAccountModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
