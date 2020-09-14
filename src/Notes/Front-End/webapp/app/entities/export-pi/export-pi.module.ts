import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    ExportPiService,
    ExportPiPopupService,
    ExportPiComponent,
    ExportPiDialogComponent,
    ExportPiPopupComponent,
    ExportPiDeletePopupComponent,
    ExportPiDeleteDialogComponent,
    exportPiRoute,
    exportPiPopupRoute,
    ExportPiResolvePagingParams,
} from './';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {exportLetterPopupRoute} from 'app/entities/export-letter';

const ENTITY_STATES = [
    ...exportPiRoute,
    ...exportPiPopupRoute,
    {
        path: ':exportPiId/export-pi-payment',
        loadChildren: '../export-pi-payment/export-pi-payment.module#NiopdcgatewayExportPiPaymentModule'
    },
    {
        path: ':exportPiId/export-pi-credit',
        loadChildren: '../export-pi-credit/export-pi-credit.module#NiopdcgatewayExportPiCreditModule'
    },
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExportPiComponent,
        ExportPiDialogComponent,
        ExportPiDeleteDialogComponent,
        ExportPiPopupComponent,
        ExportPiDeletePopupComponent,
    ],
    entryComponents: [
        ExportPiComponent,
        ExportPiDialogComponent,
        ExportPiPopupComponent,
        ExportPiDeleteDialogComponent,
        ExportPiDeletePopupComponent,
    ],
    providers: [
        ExportPiService,
        ExportPiPopupService,
        ExportPiResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayExportPiModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
