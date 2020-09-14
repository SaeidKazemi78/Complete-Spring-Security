import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../shared';
import {BalanceAggregationReportComponent} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.component';

export const balanceAggregationReportRoute: Routes = [
    {
        path: 'report/balance-aggregation',
        component: BalanceAggregationReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_BALANCE_AGGREGATION'],
            pageTitle: 'niopdcgatewayApp.balanceAggregationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
