import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {BoundaryHistoryEditCarTankComponent} from './boundary-history-edit-car-tank.component';

export const boundaryHistoryEditCarTankRoute: Routes = [
    {
        path: 'report/boundary-history-edit-car-tank',
        component: BoundaryHistoryEditCarTankComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_BOUNDARY_HISTORY_EDIT_CAR_TANK'],
            pageTitle: 'niopdcgatewayApp.boundaryHistoryEditCarTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
