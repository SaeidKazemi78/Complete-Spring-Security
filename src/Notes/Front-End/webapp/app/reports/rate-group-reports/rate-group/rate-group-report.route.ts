import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {RateGroupReportComponent} from './rate-group-report.component';

export const  RateGroupReportRoute: Routes = [
    {
        path: 'report/rate-group-report',
        component: RateGroupReportComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_GROUP_RATE_USE'],
            pageTitle: 'niopdcgatewayApp.reportRateGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
