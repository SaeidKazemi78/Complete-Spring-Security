import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {NinePageComponent} from "app/reports/ao-reports/nine-page/nine-page.component";

export const ninePageRoute: Routes = [
    {
        path: 'report/nine-page',
        component: NinePageComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'NINE_PAGE_REPORT'],
            pageTitle: 'global.menu.reportAo.ninePage'
        },
        canActivate: [UserRouteAccessService]
    }
];
