import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {CustomerOrderCapacityComponent} from './customer-order-capacity.component';
import {CustomerOrderCapacityActivePopupComponent} from './customer-order-capacity-active-dialog.component';

export const customerOrderCapacityRoute: Routes = [
    {
        path: '',
        component: CustomerOrderCapacityComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER_ORDER_CAPACITY'],
            pageTitle: 'niopdcgatewayApp.customerOrderCapacity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];

export const customerOrderCapacityPopupRoute: Routes = [
    {
        path: ':id/:isActive',
        component: CustomerOrderCapacityActivePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ACTIVE_CUSTOMER_ORDER_CAPACITY'],
            pageTitle: 'niopdcgatewayApp.customerOrderCapacity.home.title',
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];
