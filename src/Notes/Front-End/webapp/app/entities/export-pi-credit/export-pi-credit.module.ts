import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';

import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {exportPiCreditPopupRoute, ExportPiCreditResolvePagingParams, exportPiCreditRoute} from 'app/entities/export-pi-credit/export-pi-credit.route';
import {ExportPiCreditComponent} from 'app/entities/export-pi-credit/export-pi-credit.component';
import {ExportPiCreditDeleteDialogComponent, ExportPiCreditDeletePopupComponent} from 'app/entities/export-pi-credit/export-pi-credit-delete-dialog.component';
import {ExportPiCreditDialogComponent, ExportPiCreditPopupComponent} from 'app/entities/export-pi-credit/export-pi-credit-dialog.component';
import {ExportPiCreditPopupService} from 'app/entities/export-pi-credit/export-pi-credit-popup.service';

const ENTITY_STATES = [
    ...exportPiCreditRoute,
    ...exportPiCreditPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExportPiCreditComponent,
        ExportPiCreditDialogComponent,
        ExportPiCreditDeleteDialogComponent,
        ExportPiCreditPopupComponent,
        ExportPiCreditDeletePopupComponent,
    ],
    entryComponents: [
        ExportPiCreditComponent,
        ExportPiCreditDialogComponent,
        ExportPiCreditPopupComponent,
        ExportPiCreditDeleteDialogComponent,
        ExportPiCreditDeletePopupComponent,
    ],
    providers: [
        ExportPiCreditPopupService,
        ExportPiCreditResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayExportPiCreditModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
