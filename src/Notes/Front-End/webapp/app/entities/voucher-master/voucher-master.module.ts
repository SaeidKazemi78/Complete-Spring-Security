import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    VoucherMasterComponent,
    VoucherMasterConfirmDialogComponent,
    VoucherMasterRevertConfirmDialogComponent,
    VoucherMasterConfirmPopupComponent,
    VoucherMasterRevertConfirmPopupComponent,
    VoucherMasterDeleteDialogComponent,
    VoucherMasterDeletePopupComponent,
    VoucherMasterDialogComponent,
    VoucherMasterPopupComponent,
    voucherMasterPopupRoute,
    VoucherMasterPopupService,
    VoucherMasterResolvePagingParams,
    voucherMasterRoute,
    VoucherMasterService,
} from './';
import {VoucherReportComponent} from './voucher-report.component';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...voucherMasterRoute,
    ...voucherMasterPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoucherMasterComponent,
        VoucherMasterDialogComponent,
        VoucherMasterDeleteDialogComponent,
        VoucherMasterRevertConfirmDialogComponent,
        VoucherMasterConfirmDialogComponent,
        VoucherMasterRevertConfirmPopupComponent,
        VoucherMasterConfirmPopupComponent,
        VoucherMasterPopupComponent,
        VoucherMasterDeletePopupComponent,
        VoucherReportComponent
    ],
    entryComponents: [
        VoucherMasterComponent,
        VoucherMasterDialogComponent,
        VoucherMasterConfirmDialogComponent,
        VoucherMasterConfirmPopupComponent,
        VoucherMasterPopupComponent,
        VoucherMasterRevertConfirmDialogComponent,
        VoucherMasterRevertConfirmPopupComponent,
        VoucherMasterDeleteDialogComponent,
        VoucherMasterDeletePopupComponent,
        VoucherReportComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        VoucherMasterService,
        VoucherMasterPopupService,
        VoucherMasterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayVoucherMasterModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
