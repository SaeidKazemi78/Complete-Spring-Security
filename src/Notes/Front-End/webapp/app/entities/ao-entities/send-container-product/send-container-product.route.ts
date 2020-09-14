import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {SendContainerProductComponent} from './send-container-product.component';
import {SendContainerProductPopupComponent} from './send-container-product-dialog.component';
import {SendContainerProductDeletePopupComponent} from './send-container-product-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class SendContainerProductResolvePagingParams implements Resolve<any> {

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

export const sendContainerProductRoute: Routes = [
    {
        path: '',
        component: SendContainerProductComponent,
        resolve: {
            'pagingParams': SendContainerProductResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SEND_CONTAINER_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendContainerProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sendContainerProductPopupRoute: Routes = [
    {
        path: 'new/:dayDepotContainerId',
        component: SendContainerProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_SEND_CONTAINER_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendContainerProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: SendContainerProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SEND_CONTAINER_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendContainerProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: SendContainerProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SEND_CONTAINER_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendContainerProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: SendContainerProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SEND_CONTAINER_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sendContainerProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
