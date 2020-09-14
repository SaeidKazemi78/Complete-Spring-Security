import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LoanPaymentService,
    LoanPaymentPopupService,
    LoanPaymentComponent,
    LoanPaymentDialogComponent,
    LoanPaymentPopupComponent,
    LoanPaymentDeletePopupComponent,
    LoanPaymentDeleteDialogComponent,
    loanPaymentRoute,
    loanPaymentPopupRoute,
    LoanPaymentResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...loanPaymentRoute,
    ...loanPaymentPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
            RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LoanPaymentComponent,
        LoanPaymentDialogComponent,
        LoanPaymentDeleteDialogComponent,
        LoanPaymentPopupComponent,
        LoanPaymentDeletePopupComponent,
    ],
    entryComponents: [
        LoanPaymentComponent,
        LoanPaymentDialogComponent,
        LoanPaymentPopupComponent,
        LoanPaymentDeleteDialogComponent,
        LoanPaymentDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        LoanPaymentService,
        LoanPaymentPopupService,
        LoanPaymentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLoanPaymentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
