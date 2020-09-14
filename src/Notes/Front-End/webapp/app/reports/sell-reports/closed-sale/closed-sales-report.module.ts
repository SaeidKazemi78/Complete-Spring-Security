import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {ClosedSalesReportComponent} from './closed-sales-report.component';
import {ClosedSalesReportService} from './closed-sales-report.service';
import {closedSalesReportRoute} from './closed-sales-report.route';
import {ClosedSalesDetailsReportComponent} from './closed-sales-details-report.component';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(closedSalesReportRoute, {useHash: true})
    ],
    declarations: [
       ClosedSalesReportComponent,
        ClosedSalesDetailsReportComponent
    ],
    entryComponents: [
        ClosedSalesReportComponent,

    ],
    providers: [
        ClosedSalesReportService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayClosedSalesReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
