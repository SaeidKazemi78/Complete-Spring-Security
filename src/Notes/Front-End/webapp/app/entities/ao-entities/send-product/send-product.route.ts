import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {SendProductComponent} from './send-product.component';
import {SendProductPopupComponent} from './send-product-dialog.component';
import {SendProductDeletePopupComponent} from './send-product-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class SendProductResolvePagingParams implements Resolve<any> {

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

export const sendProductRoute: Routes = [
    {
        path: 'main-day-depot/:mainDayDepotId/day-depot/:dayDepotId/send-product',
        component: SendProductComponent,
        resolve: {
            'pagingParams': SendProductResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SEND_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sendProductPopupRoute: Routes = [
    {
        path: 'send-product-new/:dayDepotId',
        component: SendProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_SEND_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'send-product/:id/edit',
        component: SendProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SEND_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'send-product/:id/delete',
        component: SendProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SEND_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'send-product/:id/:view',
        component: SendProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SEND_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
