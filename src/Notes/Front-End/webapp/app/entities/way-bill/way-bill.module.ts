import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NiopdcgatewaySharedModule} from '../../shared';
import {
    WayBillComponent,
    WayBillDeleteDialogComponent,
    WayBillDeletePopupComponent,
    WayBillDialogComponent,
    WayBillPopupComponent,
    wayBillPopupRoute,
    WayBillPopupService,
    WayBillRcvDialogComponent,
    WayBillRcvPopupComponent,
    WayBillResolvePagingParams,
    wayBillRoute,
    WayBillService
} from './';

import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {WayBillReportComponent} from './way-bill-report.component';

const ENTITY_STATES = [
    ...wayBillRoute,
    ...wayBillPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WayBillComponent,
        WayBillDialogComponent,
        WayBillDeleteDialogComponent,
        WayBillPopupComponent,
        WayBillDeletePopupComponent,
        WayBillRcvDialogComponent,
        WayBillRcvPopupComponent,
        WayBillReportComponent
    ],
    entryComponents: [
        WayBillComponent,
        WayBillDialogComponent,
        WayBillPopupComponent,
        WayBillDeleteDialogComponent,
        WayBillDeletePopupComponent,
        WayBillRcvDialogComponent,
        WayBillRcvPopupComponent,
        WayBillReportComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        WayBillService,
        WayBillPopupService,
        WayBillResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayWayBillModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
