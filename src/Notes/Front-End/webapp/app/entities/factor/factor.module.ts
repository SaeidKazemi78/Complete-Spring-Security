import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NiopdcgatewaySharedModule } from '../../shared';
import {
    FactorService,
    FactorPopupService,
    FactorComponent,
    FactorDialogComponent,
    FactorPopupComponent,
    FactorDeletePopupComponent,
    FactorDeleteDialogComponent,
    factorRoute,
    factorPopupRoute,
    FactorResolvePagingParams,
} from './';
import {FactorReportComponent} from './factor-report.component';
import {FactorReportAggregateComponent} from './factor-report-aggregate.component';
import {JhiLanguageService} from 'ng-jhipster';
import {JhiLanguageHelper} from 'app/core/language.helper';

const ENTITY_STATES = [
    ...factorRoute,
    ...factorPopupRoute,
];

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FactorComponent,
        FactorReportComponent,
        FactorReportAggregateComponent,
        FactorDialogComponent,
        FactorDeleteDialogComponent,
        FactorPopupComponent,
        FactorDeletePopupComponent,
    ],
    entryComponents: [
        FactorComponent,
        FactorReportComponent,
        FactorReportAggregateComponent,
        FactorDialogComponent,
        FactorPopupComponent,
        FactorDeleteDialogComponent,
        FactorDeletePopupComponent,
    ],
    providers: [
        FactorService,
        FactorPopupService,
        FactorResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayFactorModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
