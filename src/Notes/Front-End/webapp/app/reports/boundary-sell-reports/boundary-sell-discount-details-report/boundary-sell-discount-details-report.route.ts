import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundaryDiscountDetailsSellReportComponent} from './boundary-sell-discount-details-report.component';

export const boundaryDiscountDetailsSellReportRoute: Routes = [
    {
        path: 'report/boundary-discount-details-sell-report',
        component: BoundaryDiscountDetailsSellReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_BOUNDARY_DISCOUNT_DETAILS_SELL'],
            pageTitle: 'niopdcgatewayApp.boundaryDiscountSell.discountDetailsReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
