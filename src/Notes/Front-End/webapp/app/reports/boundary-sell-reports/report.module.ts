import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NiopdcgatewayBoundarySellReportModule} from './boundary-sell/boundary-sell-report.module';
import {NiopdcgatewayBoundarySellShiftReportOldModule} from './boundary-sell-shift-report-old/boundary-sell-shift-report.module';
import {NiopdcgatewayBoundarySellTrafficReportModule} from './boundary-sell-traffic/boundary-sell-traffic-report.module';
import {NiopdcgatewayBoundarySellPenaltyReportModule} from './boundary-sell-penalty/boundary-sell-penalty-report.module';
import {NiopdcgatewayBoundarySellMultipleTrafficReportModule} from './boundary-sell-multiple-traffic/boundary-sell-multiple-traffic-report.module';
import {NiopdcgatewayBoundarySellShiftReportReportModule} from './boundary-sell-draft-shift/boundary-sell-draft-shift-report.module';
import {NiopdcgatewayBoundarySellCarTagReportModule} from './boundary-sell-car-tag/boundary-sell-car-tag-report.module';
import {NiopdcgatewayBoundarySellCarTagsReportModule} from './boundary-sell-car-tags/boundary-sell-car-tags-report.module';
import {NiopdcgatewayBoundarySellShiftNewReportModule} from './boundary-sell-shift-new/boundary-sell-shift-new-report.module';
import {NiopdcgatewayBoundarySellShiftReportModule} from './boundary-sell-shift-report/boundary-sell-shift-report.module';
import {NiopdcgatewayBoundaryDiscountSellReportModule} from './boundary-sell-discount-report/boundary-sell-discount-report.module';
import {NiopdcgatewayBoundaryDiscountDetailsSellReportModule} from './boundary-sell-discount-details-report/boundary-sell-discount-details-report.module';
import {NiopdcgatewayBoundaryMonthlySellReportModule} from "app/reports/boundary-sell-reports/boundary-monthly-sell/boundary-monthly-sell-report.module";
import {NiopdcgatewayBoundaryHistoryEditCarTankModule} from "app/reports/boundary-sell-reports/boundary-history-edit-car-tank/boundary-history-edit-car-tank.module";
import {NiopdcgatewayBoundarySellInfringementReportModule} from 'app/reports/boundary-sell-reports/boundary-sell-infringement-report/boundary-sell-infringement-report.module';
import {NiopdcgatewayBoundarySellPublicReportModule} from './boundary-sell-public-report/boundary-sell-public-report.module';

@NgModule({
    imports: [
        NiopdcgatewayBoundarySellReportModule,
        NiopdcgatewayBoundarySellShiftReportOldModule,
        NiopdcgatewayBoundarySellShiftReportModule,
        NiopdcgatewayBoundarySellTrafficReportModule,
        NiopdcgatewayBoundarySellPenaltyReportModule,
        NiopdcgatewayBoundarySellMultipleTrafficReportModule,
        NiopdcgatewayBoundarySellShiftReportReportModule,
        NiopdcgatewayBoundarySellCarTagReportModule,
        NiopdcgatewayBoundarySellInfringementReportModule,
        NiopdcgatewayBoundarySellShiftNewReportModule,
        NiopdcgatewayBoundarySellCarTagsReportModule,
        NiopdcgatewayBoundaryDiscountSellReportModule,
        NiopdcgatewayBoundaryDiscountDetailsSellReportModule,
        NiopdcgatewayBoundaryMonthlySellReportModule,
        NiopdcgatewayBoundaryHistoryEditCarTankModule,
        NiopdcgatewayBoundarySellPublicReportModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NiopdcgatewayBoundaryReportModule {
}
