import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellTrafficReportComponent} from './boundary-sell-traffic-report.component';

export const boundarySellTrafficReportRoute: Routes = [
    {
        path: 'report/boundary-sell-traffic-report',
        component: BoundarySellTrafficReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_TRAFFIC_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellTrafficReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
