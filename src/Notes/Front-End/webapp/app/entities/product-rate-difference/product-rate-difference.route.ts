import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ProductRateDifferenceComponent} from './product-rate-difference.component';
import {ProductRateDifferenceDialogComponent} from './product-rate-difference-dialog.component';
import {ProductRateDifferenceDeletePopupComponent} from './product-rate-difference-delete-dialog.component';
import {ProductRateDifferencePaymentComponent} from './product-rate-difference-payment.component';

@Injectable({ providedIn: 'root' })
export class ProductRateDifferenceResolvePagingParams implements Resolve<any> {

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

export const productRateDifferenceRoute: Routes = [
    {
        path: '',
        component: ProductRateDifferenceComponent,
        resolve: {
            'pagingParams': ProductRateDifferenceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.productRateDifference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductRateDifferenceDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.productRateDifference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payment/:payId',
        component: ProductRateDifferencePaymentComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PAYMENT_PRODUCT_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.productRateDifference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productRateDifferencePopupRoute: Routes = [
    {
        path: 'payment',
        component: ProductRateDifferencePaymentComponent,
        resolve: {
            'pagingParams': ProductRateDifferenceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'PAYMENT_PRODUCT_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.productRateDifference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, /*
    {
        path: 'product-rate-difference/:id/edit',
        component: ProductRateDifferencePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.productRateDifference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },*/
    {
        path: ':id/delete',
        component: ProductRateDifferenceDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PRODUCT_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.productRateDifference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }/*,
    {
        path: 'product-rate-difference/:id/:view',
        component: ProductRateDifferencePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT_RATE_DIFFERENCE'],
            pageTitle: 'niopdcgatewayApp.productRateDifference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }*/
];
