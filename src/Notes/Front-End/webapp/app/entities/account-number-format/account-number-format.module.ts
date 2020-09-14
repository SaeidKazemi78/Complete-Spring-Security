import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    AccountNumberFormatService,
    AccountNumberFormatPopupService,
    AccountNumberFormatComponent,
    AccountNumberFormatDialogComponent,
    AccountNumberFormatPopupComponent,
    AccountNumberFormatDeletePopupComponent,
    AccountNumberFormatDeleteDialogComponent,
    accountNumberFormatRoute,
    accountNumberFormatPopupRoute,
    AccountNumberFormatResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...accountNumberFormatRoute,
    ...accountNumberFormatPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AccountNumberFormatComponent,
        AccountNumberFormatDialogComponent,
        AccountNumberFormatDeleteDialogComponent,
        AccountNumberFormatPopupComponent,
        AccountNumberFormatDeletePopupComponent,
    ],
    entryComponents: [
        AccountNumberFormatComponent,
        AccountNumberFormatDialogComponent,
        AccountNumberFormatPopupComponent,
        AccountNumberFormatDeleteDialogComponent,
        AccountNumberFormatDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        AccountNumberFormatService,
        AccountNumberFormatPopupService,
        AccountNumberFormatResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayAccountNumberFormatModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
