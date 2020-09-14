import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundaryDetailsSellReportComponent} from './boundary-sell-details-report.component';

export const boundaryDetailsSellReportRoute: Routes = [
    {
        path: 'report/boundary-details-sell-report',
        component: BoundaryDetailsSellReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_DETAIL_REPORT'],
            pageTitle: 'niopdcgatewayApp.boundaryDetailsSell.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
