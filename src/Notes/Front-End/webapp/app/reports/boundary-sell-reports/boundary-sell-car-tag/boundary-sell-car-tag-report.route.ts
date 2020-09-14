import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellCarTagReportComponent} from './boundary-sell-car-tag-report.component';

export const boundarySellCarTagReportRoute: Routes = [
    {
        path: 'report/boundary-sell-car-tag-report',
        component: BoundarySellCarTagReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_CAR_TAG_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellCarTagReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
