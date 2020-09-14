import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ProductRateComponent} from './product-rate.component';
import {ProductRatePopupComponent} from './product-rate-dialog.component';
import {ProductRateDeletePopupComponent} from './product-rate-delete-dialog.component';
import {ProductRateConfirmPopupComponent} from './product-rate-confirm-dialog.component';

@Injectable({providedIn: 'root'})
export class ProductRateResolvePagingParams implements Resolve<any> {

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

export const productRateRoute: Routes = [
    {
        path: '',
        component: ProductRateComponent,
        resolve: {
            'pagingParams': ProductRateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT_RATE', 'LIST_CONTAINER_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];

export const productRatePopupRoute: Routes = [
    {
        path: 'new/:rateGroupId/:type',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT_RATE', 'CREATE_CONTAINER_RATE'],
            pageTitle: 'niopdcgatewayApp.containerRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit/:type',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT_RATE', 'EDIT_CONTAINER_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ProductRateDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PRODUCT_RATE', 'DELETE_CONTAINER_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/confirm',
        component: ProductRateConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_PRODUCT_RATE', 'CONFIRM_CONTAINER_RATE'],
            pageTitle: 'niopdcgatewayApp.productRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view/:type',
        component: ProductRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT_RATE', 'VIEW_CONTAINER_RATE'],
            pageTitle: 'niopdcgatewayApp.containerRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
