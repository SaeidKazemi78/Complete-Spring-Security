import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellInfringementReportComponent} from './boundary-sell-infringement-report.component';

export const boundarySellInfringementReportRoute: Routes = [
    {
        path: 'report/boundary-infringement-sell-report',
        component: BoundarySellInfringementReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_INFRINGEMENT_REPORT'],
            pageTitle: 'niopdcgatewayApp.infringement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
