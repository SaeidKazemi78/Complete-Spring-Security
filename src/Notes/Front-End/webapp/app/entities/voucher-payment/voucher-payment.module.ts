import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    VoucherPaymentService,
    VoucherPaymentPopupService,
    VoucherPaymentComponent,
    VoucherPaymentDialogComponent,
    VoucherPaymentPopupComponent,
    VoucherPaymentDeletePopupComponent,
    VoucherPaymentDeleteDialogComponent,
    voucherPaymentRoute,
    voucherPaymentPopupRoute,
    VoucherPaymentResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...voucherPaymentRoute,
    ...voucherPaymentPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoucherPaymentComponent,
        VoucherPaymentDialogComponent,
        VoucherPaymentDeleteDialogComponent,
        VoucherPaymentPopupComponent,
        VoucherPaymentDeletePopupComponent,
    ],
    entryComponents: [
        VoucherPaymentComponent,
        VoucherPaymentDialogComponent,
        VoucherPaymentPopupComponent,
        VoucherPaymentDeleteDialogComponent,
        VoucherPaymentDeletePopupComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        VoucherPaymentService,
        VoucherPaymentPopupService,
        VoucherPaymentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherPaymentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
