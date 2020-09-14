import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ReceivedProductComponent} from './received-product.component';
import {ReceivedProductPopupComponent} from './received-product-dialog.component';
import {ReceivedProductDeletePopupComponent} from './received-product-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ReceivedProductResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const receivedProductRoute: Routes = [
    {
        path: 'main-day-depot/:mainDayDepotId/day-depot/:dayDepotId/received-product',
        component: ReceivedProductComponent,
        resolve: {
            'pagingParams': ReceivedProductResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_RECEIVED_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.receivedProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receivedProductPopupRoute: Routes = [
    {
        path: 'received-product-new/:dayDepotId',
        component: ReceivedProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_RECEIVED_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.receivedProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'received-product/:id/day-depot/:dayDepotId/edit',
        component: ReceivedProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_RECEIVED_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.receivedProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'received-product/:id/delete',
        component: ReceivedProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_RECEIVED_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.receivedProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'received-product/:id/day-depot/:dayDepotId/:view',
        component: ReceivedProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_RECEIVED_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.receivedProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
