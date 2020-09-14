import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {OrderNumberComponent} from './order-number.component';
import {OrderNumberPopupComponent} from './order-number-dialog.component';
import {OrderNumberDisablePopupComponent} from './order-number-disable-dialog.component';

@Injectable({ providedIn: 'root' })
export class OrderNumberResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const orderNumberRoute: Routes = [
    {
        path: '',
        component: OrderNumberComponent,
        resolve: {
            'pagingParams': OrderNumberResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ORDER_NUMBER', 'LIST_FUEL_RECEIPT_NUMBER'],
            pageTitle: 'niopdcgatewayApp.orderNumber.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderNumberPopupRoute: Routes = [
    {
        path: 'new/:locationId',
        component: OrderNumberPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_ORDER_NUMBER'],
            pageTitle: 'niopdcgatewayApp.orderNumber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/:refuelCenterId',
        component: OrderNumberPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_FUEL_RECEIPT_NUMBER'],
            pageTitle: 'niopdcgatewayApp.fuelReceipt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: OrderNumberPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_ORDER_NUMBER', 'EDIT_FUEL_RECEIPT_NUMBER'],
            pageTitle: 'niopdcgatewayApp.orderNumber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/disable',
        component: OrderNumberDisablePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DISABLE_ORDER_NUMBER', 'DISABLE_FUEL_RECEIPT_NUMBER'],
            pageTitle: 'niopdcgatewayApp.orderNumber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: OrderNumberPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_ORDER_NUMBER', 'VIEW_FUEL_RECEIPT_NUMBER'],
            pageTitle: 'niopdcgatewayApp.orderNumber.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
