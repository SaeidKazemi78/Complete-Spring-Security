import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    LoanService,
    LoanPopupService,
    LoanComponent,
    LoanDialogComponent,
    LoanPopupComponent,
    LoanDeletePopupComponent,
    LoanDeleteDialogComponent,
    loanRoute,
    loanPopupRoute,
    LoanResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...loanRoute,
    ...loanPopupRoute,
    {
        path: ':loanId/installment',
        loadChildren: '../installment/installment.module#NiopdcgatewayInstallmentModule'
    },
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LoanComponent,
        LoanDialogComponent,
        LoanDeleteDialogComponent,
        LoanPopupComponent,
        LoanDeletePopupComponent,
    ],
    entryComponents: [
        LoanComponent,
        LoanDialogComponent,
        LoanPopupComponent,
        LoanDeleteDialogComponent,
        LoanDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        LoanService,
        LoanPopupService,
        LoanResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayLoanModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
