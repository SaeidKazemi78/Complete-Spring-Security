import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    PaymentService,
    PaymentPopupService,
    PaymentComponent,
    PaymentDeletePopupComponent,
    PaymentDeleteDialogComponent,
    paymentRoute,
    paymentPopupRoute,
    PaymentResolvePagingParams,
    PaymentInquiryComponent
} from './';
import {CheckboxModule} from 'primeng/primeng';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...paymentRoute,
    ...paymentPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        CheckboxModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaymentComponent,
        PaymentDeleteDialogComponent,
        PaymentDeletePopupComponent,
        PaymentInquiryComponent
    ],
    entryComponents: [
        PaymentComponent,
        PaymentDeleteDialogComponent,
        PaymentDeletePopupComponent,
        PaymentInquiryComponent
    ],
    providers: [
        PaymentService,
        PaymentPopupService,
        PaymentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayPaymentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
