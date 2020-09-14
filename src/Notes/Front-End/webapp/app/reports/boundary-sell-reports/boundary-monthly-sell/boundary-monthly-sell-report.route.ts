import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundaryMonthlySellReportComponent} from './boundary-monthly-sell-report.component';

export const boundaryMonthlySellReportRoute: Routes = [
    {
        path: 'report/boundary-monthly-sell-report',
        component: BoundaryMonthlySellReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_MONTHLY_SELL_REPORT'],
            pageTitle: 'niopdcgatewayApp.boundaryDetailsSell.home.monthlySell'
        },
        canActivate: [UserRouteAccessService]
    }
];
