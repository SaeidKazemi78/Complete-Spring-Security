import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CustomerComponent} from './customer.component';
import {CustomerPopupComponent} from './customer-dialog.component';
import {CustomerDeletePopupComponent} from './customer-delete-dialog.component';
import {BoundaryCustomerComponent} from './boundary-customer.component';
import {BoundaryPopupComponent} from './boundary-dialog.component';
import {CustomerCreditAccountPopupComponent} from './customer-credit-account-dialog.component';
import {CustomerBoundaryArchiveDialogComponent} from './boundary-customer-archive-dialog.component';

@Injectable({ providedIn: 'root' })
export class CustomerResolvePagingParams implements Resolve<any> {

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

@Injectable({ providedIn: 'root' })
export class BoundaryCustomerResolvePagingParams implements Resolve<any> {

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

export const customerRoute: Routes = [
    {
        path: '',
        component: CustomerComponent,
        resolve: {
            'pagingParams': CustomerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sell-contract/:sellContractId/customer',
        component: CustomerComponent,
        resolve: {
            'pagingParams': CustomerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':customerId/customer-credit/:customerCreditId/ceiling-quota',
        loadChildren: '../ceiling-quota/ceiling-quota.module#NiopdcgatewayCeilingQuotaModule'
    },
    {
        path: ':customerId/customer-deactive-rule',
        loadChildren: '../customer-deactive-rule/customer-deactive-rule.module#NiopdcgatewayCustomerDeactiveRuleModule'
    },
    {
        path: ':customerId/customer-visit',
        loadChildren: '../customer-visit/customer-visit.module#NiopdcgatewayCustomerVisitModule'
    },
    {
        path: ':customerId/customer-order-capacity',
        loadChildren: '../customer-order-capacity/customer-order-capacity.module#NiopdcgatewayCustomerOrderCapacityModule'
    },
    {
        path: ':customerId/rate-difference',
        loadChildren: '../rate-difference/rate-difference.module#NiopdcgatewayRateDifferenceModule'
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'new',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: ':id/delete',
        component: CustomerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/credit-account',
        component: CustomerCreditAccountPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREDIT_ACCOUNT_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CustomerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];

