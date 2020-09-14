import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellDraftShiftReportComponent} from './boundary-sell-draft-shift-report.component';

export const boundarySellDraftShiftReportRoute: Routes = [
    {
        path: 'report/boundary-sell-draft-shift-report',
        component: BoundarySellDraftShiftReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_DRAFT_SHIFT_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellDraftShiftReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
