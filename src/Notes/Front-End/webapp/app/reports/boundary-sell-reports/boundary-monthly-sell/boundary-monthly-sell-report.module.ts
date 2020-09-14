import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {boundaryMonthlySellReportRoute} from './boundary-monthly-sell-report.route';
import {BoundaryMonthlySellReportComponent} from './boundary-monthly-sell-report.component';
import {BoundaryMonthlySellReportService} from './boundary-monthly-sell-report.service';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(boundaryMonthlySellReportRoute, {useHash: true})
    ],
    declarations: [
        BoundaryMonthlySellReportComponent,
    ],
    entryComponents: [
        BoundaryMonthlySellReportComponent,
    ],
    providers: [
        BoundaryMonthlySellReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryMonthlySellReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
