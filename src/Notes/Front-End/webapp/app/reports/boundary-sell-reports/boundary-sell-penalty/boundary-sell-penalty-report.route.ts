import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellPenaltyReportComponent} from './boundary-sell-penalty-report.component';

export const boundarySellPenaltyReportRoute: Routes = [
    {
        path: 'report/boundary-sell-penalty-report',
        component: BoundarySellPenaltyReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_PENALTY_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellPenaltyReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
