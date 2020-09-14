import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundaryDiscountSellReportComponent} from './boundary-sell-discount-report.component';

export const boundaryDiscountSellReportRoute: Routes = [
    {
        path: 'report/boundary-discount-sell-report',
        component: BoundaryDiscountSellReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_BOUNDARY_DISCOUNT_SELL'],
            pageTitle: 'niopdcgatewayApp.boundaryDiscountSell.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
