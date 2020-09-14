import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NiopdcgatewayDailySalesModule} from './daily-sales/daily-sales.module';
import {NiopdcgatewayDailySalesSummaryModule} from './daily-sales-summary/daily-sales-summary.module';
import {NiopdcgatewayDailySalesStatisticalModule} from './daily-sales-statistical/daily-sales-statistical.module';
import {NiopdcgatewayConsumptionModule} from './consumption/consumption.module';
import {NiopdcgatewayDetailsBuyModule} from './details-buy/details-buy.module';
import {NiopdcgatewayCustomerReportModule} from './customer/customer.module';
import {NiopdcgatewayPersonReportModule} from './person/person.module';
import {NiopdcgatewaySevenPageModule} from './seven-page/seven-page.module';
import {NiopdcgatewayCustomerStationInfoReportModule} from './customer-station-info-report/customer-station-info-report.module';
import {NiopdcgatewayClosedSalesReportModule} from './closed-sale';
import {NiopdcgatewayInvoiceSellReportModule} from './invoice-sales/invoice-report.module';
import {NiopdcgatewayBrandSellModule} from "app/reports/sell-reports/brand-sell/brand-sell.module";
import {NiopdcgatewayDecompositionModule} from 'app/reports/sell-reports/decomposition/decomposition.module';
import {NiopdcgatewayMonthlyReportModule} from "app/reports/sell-reports/monthly-report/monthly-report.module";
import {NiopdcgatewayBalanceAggregationReportModule} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.module';
import {NiopdcgatewayComparisonProductSellModule} from 'app/reports/sell-reports/comparison-product-sell/comparison-product-sell.module';
import {NiopdcgatewaySellByContractTypeReportModule} from "app/reports/sell-reports/sell-by-contract-type/sell-by-contract-type.module";

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewayDailySalesModule,
        NiopdcgatewayDailySalesSummaryModule,
        NiopdcgatewayDailySalesStatisticalModule,
        NiopdcgatewayConsumptionModule,
        NiopdcgatewayDetailsBuyModule,
        NiopdcgatewayCustomerReportModule,
        NiopdcgatewayPersonReportModule,
        NiopdcgatewaySevenPageModule,
        NiopdcgatewayCustomerStationInfoReportModule,
        NiopdcgatewayClosedSalesReportModule,
        NiopdcgatewayInvoiceSellReportModule,
        NiopdcgatewayBrandSellModule,
        NiopdcgatewayInvoiceSellReportModule,
        NiopdcgatewayDecompositionModule,
        NiopdcgatewayMonthlyReportModule,
        NiopdcgatewayBalanceAggregationReportModule,
        NiopdcgatewayComparisonProductSellModule,
        NiopdcgatewaySellByContractTypeReportModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewaySellReportModule {}
