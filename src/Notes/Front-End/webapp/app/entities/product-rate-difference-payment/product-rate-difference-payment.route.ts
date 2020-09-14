import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProductRateDifferencePaymentComponent } from './product-rate-difference-payment.component';
import { ProductRateDifferencePaymentDetailComponent } from './product-rate-difference-payment-detail.component';
import { ProductRateDifferencePaymentPopupComponent } from './product-rate-difference-payment-dialog.component';
import {
    ProductRateDifferencePaymentDeletePopupComponent
} from './product-rate-difference-payment-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ProductRateDifferencePaymentResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const productRateDifferencePaymentRoute: Routes = [
    {
        path: 'product-rate-difference-payment',
        component: ProductRateDifferencePaymentComponent,
        resolve: {
            'pagingParams': ProductRateDifferencePaymentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.productRateDifferencePayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-rate-difference-payment/:id',
        component: ProductRateDifferencePaymentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.productRateDifferencePayment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productRateDifferencePaymentPopupRoute: Routes = [
    {
        path: 'product-rate-difference-payment-new',
        component: ProductRateDifferencePaymentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.productRateDifferencePayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-rate-difference-payment/:id/edit',
        component: ProductRateDifferencePaymentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.productRateDifferencePayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-rate-difference-payment/:id/delete',
        component: ProductRateDifferencePaymentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'niopdcgatewayApp.productRateDifferencePayment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
