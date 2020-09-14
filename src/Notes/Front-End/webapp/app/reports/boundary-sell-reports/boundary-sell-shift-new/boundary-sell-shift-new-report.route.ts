import {Routes} from '@angular/router';
import {BoundarySellShiftNewReportComponent} from './boundary-sell-shift-new-report.component';
import {UserRouteAccessService} from '../../../shared/index';

export const boundarySellShiftNewReportRoute: Routes = [
    {
        path: 'report/boundary-sell-shift-new-report',
        component: BoundarySellShiftNewReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_SHIFT_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellShiftReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
