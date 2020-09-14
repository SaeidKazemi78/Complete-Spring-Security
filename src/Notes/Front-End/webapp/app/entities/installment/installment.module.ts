import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    InstallmentService,
    InstallmentComponent,
    installmentRoute,
} from './';
import {InstallmentPaymentComponent} from './installment-payment.component';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...installmentRoute
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InstallmentComponent,
        InstallmentPaymentComponent
    ],
    entryComponents: [
        InstallmentComponent,
        InstallmentPaymentComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        InstallmentService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayInstallmentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
