import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    WalletService,
    WalletPopupService,
    WalletComponent,
    WalletDialogComponent,
    WalletPopupComponent,
    WalletDeletePopupComponent,
    WalletDeleteDialogComponent,
    walletRoute,
    walletPopupRoute,
    WalletResolvePagingParams,
    WalletPaymentPageComponent,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...walletRoute,
    ...walletPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WalletComponent,
        WalletDialogComponent,
        WalletDeleteDialogComponent,
        WalletPopupComponent,
        WalletDeletePopupComponent,
        WalletPaymentPageComponent,
    ],
    entryComponents: [
        WalletComponent,
        WalletDialogComponent,
        WalletPopupComponent,
        WalletDeleteDialogComponent,
        WalletDeletePopupComponent,
        WalletPaymentPageComponent,
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        WalletService,
        WalletPopupService,
        WalletResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayWalletModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
