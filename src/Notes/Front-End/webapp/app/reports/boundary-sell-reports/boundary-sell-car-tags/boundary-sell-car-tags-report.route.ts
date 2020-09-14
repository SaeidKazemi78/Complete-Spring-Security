import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundarySellCarTagsReportComponent} from './boundary-sell-car-tags-report.component';

export const boundarySellCarTagsReportRoute: Routes = [
    {
        path: 'report/boundary-sell-car-tags-report',
        component: BoundarySellCarTagsReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_SELL_CAR_TAGS_REPORT'],
            pageTitle: 'global.menu.reportBoundarySell.boundarySellCarTagsReport'
        },
        canActivate: [UserRouteAccessService]
    }
];
