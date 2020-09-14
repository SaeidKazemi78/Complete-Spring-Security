import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    BillService,
    BillPopupService,
    BillComponent,
    BillDialogComponent,
    BillPopupComponent,
    BillDeletePopupComponent,
    BillDeleteDialogComponent,
    billRoute,
    billPopupRoute,
    BillResolvePagingParams,
} from './';
import {BillReportComponent} from './bill-report.component';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';
const ENTITY_STATES = [
    ...billRoute,
    ...billPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillComponent,
        BillDialogComponent,
        BillDeleteDialogComponent,
        BillPopupComponent,
        BillDeletePopupComponent,
        BillReportComponent
    ],
    entryComponents: [
        BillComponent,
        BillDialogComponent,
        BillPopupComponent,
        BillDeleteDialogComponent,
        BillDeletePopupComponent,
        BillReportComponent
    ],
    providers: [
        { provide: JhiLanguageService, useClass: JhiLanguageService },
        BillService,
        BillPopupService,
        BillResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBillModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
