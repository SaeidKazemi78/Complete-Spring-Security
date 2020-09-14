import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    SellContractComponent,
    SellContractConfirmDialogComponent,
    SellContractConfirmPopupComponent,
    SellContractDeleteDialogComponent,
    SellContractDeletePopupComponent,
    SellContractDialogComponent,
    sellContractPopupRoute,
    SellContractPopupService,
    SellContractResolvePagingParams,
    sellContractRoute,
    SellContractService
} from './';
import {TransferQuotaDialogComponent, TransferQuotaPopupDialogComponent} from './transfer-quota-dialog.component';
import {TransferQuotaPopupService} from './transfer-quota-popup.service';
import {SellContractCustomerService} from './sell-contract-customer.service';
import {SellContractPersonService} from './sell-contract-person.service';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...sellContractRoute,
    ...sellContractPopupRoute,
    {
        path: ':sellContractId/sell-contract-product',
        loadChildren: '../sell-contract-product/sell-contract-product.module#NiopdcgatewaySellContractProductModule'
    },
    {
        path: ':sellContractId/export-letter',
        loadChildren: '../export-letter/export-letter.module#NiopdcgatewayExportLetterModule'
    },
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SellContractComponent,
        SellContractDialogComponent,
        SellContractDeleteDialogComponent,
        SellContractDeletePopupComponent,
        SellContractConfirmDialogComponent,
        SellContractConfirmPopupComponent,
        TransferQuotaDialogComponent,
        TransferQuotaPopupDialogComponent
    ],
    entryComponents: [
        SellContractComponent,
        SellContractDialogComponent,
        SellContractDeleteDialogComponent,
        SellContractDeletePopupComponent,
        SellContractConfirmDialogComponent,
        SellContractConfirmPopupComponent,
        TransferQuotaDialogComponent,
        TransferQuotaPopupDialogComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        SellContractService,
        SellContractCustomerService,
        SellContractPersonService,
        SellContractPopupService,
        TransferQuotaPopupService,
        SellContractResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellContractModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
