import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {PersonComponent} from './person.component';

export const personRoute: Routes = [
    {
        path: 'report/person',
        component: PersonComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_REPORT_PERSON'],
            pageTitle: 'niopdcgatewayApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
