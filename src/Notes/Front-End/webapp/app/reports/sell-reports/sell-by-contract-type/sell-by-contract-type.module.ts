import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NiopdcgatewaySharedModule} from '../../../shared';
import {RouterModule} from '@angular/router';
import {JhiLanguageHelper} from 'app/core/language.helper';
import {JhiLanguageService} from 'ng-jhipster';
import {BalanceAggregationReportComponent} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.component';
import {BalanceAggregationService} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.service';
import {balanceAggregationReportRoute} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.route';
import {sellByContractTypeReportRoute} from "app/reports/sell-reports/sell-by-contract-type/sell-by-contract-type.route";
import {SellByContractTypeComponent} from "app/reports/sell-reports/sell-by-contract-type/sell-by-contract-type.component";
import {SellByContractTypeService} from "app/reports/sell-reports/sell-by-contract-type/sell-by-contract-type.service";
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySharedModule,
        RouterModule.forRoot(sellByContractTypeReportRoute, {useHash: true})
    ],
    declarations: [
        SellByContractTypeComponent,
    ],
    entryComponents: [
        SellByContractTypeComponent,
    ],
    providers: [
        SellByContractTypeService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellByContractTypeReportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
