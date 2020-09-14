import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellPublicReportComponent} from './boundary-sell-public-report.component';

export const boundarySellPublicReportRoute: Routes = [
    {
        path: 'report/boundary-sell-public-report',
        component: BoundarySellPublicReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_SHIFT_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellPublicReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
