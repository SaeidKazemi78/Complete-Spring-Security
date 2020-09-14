import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {BalanceAggregationReportComponent} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.component';
import {BalanceAggregationService} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.service';
import {balanceAggregationReportRoute} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.route';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(balanceAggregationReportRoute, {useHash: true})
    ],
    declarations: [
        BalanceAggregationReportComponent,
    ],
    entryComponents: [
        BalanceAggregationReportComponent,
    ],
    providers: [
        BalanceAggregationService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBalanceAggregationReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
