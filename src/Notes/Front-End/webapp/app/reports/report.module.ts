import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NiopdcgatewaySellReportModule} from './sell-reports/report.module';
import {NiopdcgatewayAoReportModule} from './ao-reports/report.module';
import {NiopdcgatewayBoundaryDetailsSellReportModule} from './boundary-sell-reports/boundary-sell-details-report/boundary-sell-details-report.module';
import {NiopdcgatewayRateReportModule} from './rate-group-reports/report.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NiopdcgatewaySellReportModule,
        NiopdcgatewayBoundaryDetailsSellReportModule,
        NiopdcgatewayAoReportModule,
        NiopdcgatewayRateReportModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayReportModule {}
