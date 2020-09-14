import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {NiopdcgatewaySharedModule} from '../../../shared/index';
import {
    CleaningReportOilTankComponent,
    CleaningReportOilTankConfirmDialogComponent,
    CleaningReportOilTankConfirmPopupComponent,
    CleaningReportOilTankDeleteDialogComponent,
    CleaningReportOilTankDeletePopupComponent,
    CleaningReportOilTankDialogComponent,
    CleaningReportOilTankPopupComponent,
    cleaningReportOilTankPopupRoute,
    CleaningReportOilTankPopupService,
    CleaningReportOilTankResolvePagingParams,
    cleaningReportOilTankRoute,
    CleaningReportOilTankSendDialogComponent,
    CleaningReportOilTankSendPopupComponent,
    CleaningReportOilTankService,
} from './index';
import {CleaningReportOilTankPrintComponent} from './cleaning-report-oil-tank-print.component';

const ENTITY_STATES = [
    ...cleaningReportOilTankRoute,
    ...cleaningReportOilTankPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CleaningReportOilTankComponent,
        CleaningReportOilTankDialogComponent,
        CleaningReportOilTankDeleteDialogComponent,
        CleaningReportOilTankConfirmDialogComponent,
        CleaningReportOilTankSendDialogComponent,
        CleaningReportOilTankPopupComponent,
        CleaningReportOilTankDeletePopupComponent,
        CleaningReportOilTankConfirmPopupComponent,
        CleaningReportOilTankSendPopupComponent,
        CleaningReportOilTankPrintComponent
    ],
    entryComponents: [
        CleaningReportOilTankComponent,
        CleaningReportOilTankDialogComponent,
        CleaningReportOilTankPopupComponent,
        CleaningReportOilTankDeleteDialogComponent,
        CleaningReportOilTankDeletePopupComponent,
        CleaningReportOilTankConfirmDialogComponent,
        CleaningReportOilTankConfirmPopupComponent,
        CleaningReportOilTankSendDialogComponent,
        CleaningReportOilTankSendPopupComponent,
        CleaningReportOilTankPrintComponent
    ],
    providers: [
        CleaningReportOilTankService,
        CleaningReportOilTankPopupService,
        CleaningReportOilTankResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayCleaningReportOilTankModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
