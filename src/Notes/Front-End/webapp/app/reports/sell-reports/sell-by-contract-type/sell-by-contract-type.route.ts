import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../../shared';
import {BalanceAggregationReportComponent} from 'app/reports/sell-reports/balance-aggregation/balance-aggregation.component';
import {SellByContractTypeComponent} from "app/reports/sell-reports/sell-by-contract-type/sell-by-contract-type.component";

export const sellByContractTypeReportRoute: Routes = [
    {
        path: 'report/sell-by-contract-type',
        component: SellByContractTypeComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_SELL_BY_CONTRACT_TYPE'],
            pageTitle: 'niopdcgatewayApp.balanceAggregationReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
