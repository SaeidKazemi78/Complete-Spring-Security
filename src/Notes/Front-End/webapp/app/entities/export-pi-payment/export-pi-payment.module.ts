import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    ExportPiPaymentService,
    ExportPiPaymentPopupService,
    ExportPiPaymentComponent,
    ExportPiPaymentDialogComponent,
    ExportPiPaymentPopupComponent,
    ExportPiPaymentDeletePopupComponent,
    ExportPiPaymentDeleteDialogComponent,
    exportPiPaymentRoute,
    exportPiPaymentPopupRoute,
    ExportPiPaymentResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {ExportPiEPaymentComponent} from 'app/entities/export-pi-payment/export-pi-e-payment.component';

const ENTITY_STATES = [
    ...exportPiPaymentRoute,
    ...exportPiPaymentPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExportPiPaymentComponent,
        ExportPiEPaymentComponent,
        ExportPiPaymentDialogComponent,
        ExportPiPaymentDeleteDialogComponent,
        ExportPiPaymentPopupComponent,
        ExportPiPaymentDeletePopupComponent,
    ],
    entryComponents: [
        ExportPiPaymentComponent,
        ExportPiEPaymentComponent,
        ExportPiPaymentDialogComponent,
        ExportPiPaymentPopupComponent,
        ExportPiPaymentDeleteDialogComponent,
        ExportPiPaymentDeletePopupComponent,
    ],
    providers: [
        ExportPiPaymentService,
        ExportPiPaymentPopupService,
        ExportPiPaymentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayExportPiPaymentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
