import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellReportComponent} from './boundary-sell-report.component';

export const boundarySellReportRoute: Routes = [
    {
        path: 'report/boundary-sell-report',
        component: BoundarySellReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_REPORT'],
            pageTitle: 'niopdcgatewayApp.boundarySell.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
