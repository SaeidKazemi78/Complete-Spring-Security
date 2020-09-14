import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellMultipleTrafficReportComponent} from './boundary-sell-multiple-traffic-report.component';

export const boundarySellMultipleTrafficReportRoute: Routes = [
    {
        path: 'report/boundary-sell-multiple-traffic-report',
        component: BoundarySellMultipleTrafficReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_MULTIPLE_TRAFFIC_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellMultipleTrafficReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
