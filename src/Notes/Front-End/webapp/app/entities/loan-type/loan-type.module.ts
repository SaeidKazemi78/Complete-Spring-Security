import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LoanTypeService,
    LoanTypePopupService,
    LoanTypeComponent,
    LoanTypeDialogComponent,
    LoanTypePopupComponent,
    LoanTypeDeletePopupComponent,
    LoanTypeDeleteDialogComponent,
    loanTypeRoute,
    loanTypePopupRoute,
    LoanTypeResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...loanTypeRoute,
    ...loanTypePopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LoanTypeComponent,
        LoanTypeDialogComponent,
        LoanTypeDeleteDialogComponent,
        LoanTypePopupComponent,
        LoanTypeDeletePopupComponent,
    ],
    entryComponents: [
        LoanTypeComponent,
        LoanTypeDialogComponent,
        LoanTypePopupComponent,
        LoanTypeDeleteDialogComponent,
        LoanTypeDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        LoanTypeService,
        LoanTypePopupService,
        LoanTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLoanTypeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
