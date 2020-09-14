import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellShiftReportComponent} from './boundary-sell-shift-report.component';

export const boundarySellShiftReportRoute: Routes = [
    {
        path: 'report/boundary-sell-shift-old-report',
        component: BoundarySellShiftReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_SHIFT_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellShiftReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
