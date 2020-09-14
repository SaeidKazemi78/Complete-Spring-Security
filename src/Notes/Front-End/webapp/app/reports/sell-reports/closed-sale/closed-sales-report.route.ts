
import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import {ClosedSalesReportComponent} from './closed-sales-report.component';

export const closedSalesReportRoute: Routes = [
    {
        path: 'report/closed-sales-report',
        component: ClosedSalesReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_CLOSED_SALES'],
            pageTitle: 'niopdcgatewayApp.closedSales.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
