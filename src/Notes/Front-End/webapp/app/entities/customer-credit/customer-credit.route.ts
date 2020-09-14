import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {CustomerCreditComponent} from './customer-credit.component';
import {CustomerCreditPopupComponent} from './customer-credit-dialog.component';
import {CustomerCreditDeletePopupComponent} from './customer-credit-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CustomerCreditResolvePagingParams implements Resolve<any> {

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

export const customerCreditRoute: Routes = [
    {
        path: '',
        component: CustomerCreditComponent,
        resolve: {
            'pagingParams': CustomerCreditResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PERSON_CREDIT', 'LIST_CUSTOMER_CREDIT', 'LIST_SELL_CONTRACT_PRODUCT_CREDIT'],
            pageTitle: 'niopdcgatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':customerId/customer-credit/:customerCreditId/ceiling-quota',
        loadChildren: '../ceiling-quota/ceiling-quota.module#NiopdcgatewayCeilingQuotaModule'
    },
];

export const customerCreditPopupRoute: Routes = [
    {
        path: 'new/customer/:customerId',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_CREDIT'],
            pageTitle: 'niopdcgatewayApp.customerCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/person/:personId',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PERSON_CREDIT'],
            pageTitle: 'niopdcgatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/sell-contract-product/:sellContractProductId',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CUSTOMER_CREDIT', 'CREATE_PERSON_CREDIT'],
            pageTitle: 'niopdcgatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/customer/:customerId/edit',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_CREDIT'],
            pageTitle: 'niopdcgatewayApp.customerCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/person/:personId/edit',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PERSON_CREDIT'],
            pageTitle: 'niopdcgatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-product-credit/:id/sell-contract-product/:sellContractProductId/edit',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CUSTOMER_CREDIT', 'EDIT_PERSON_CREDIT'],
            pageTitle: 'niopdcgatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CustomerCreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER_CREDIT'],
            pageTitle: 'niopdcgatewayApp.customerCredit.home.title',
            isPerson: false
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CustomerCreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PERSON_CREDIT'],
            pageTitle: 'niopdcgatewayApp.customerCredit.home.title',
            isPerson: true
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sell-contract-product-credit/:id/delete',
        component: CustomerCreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CUSTOMER_CREDIT', 'DELETE_PERSON_CREDIT'],
            pageTitle: 'niopdcgatewayApp.customerCredit.home.title',
            isPerson: true
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/customer/:customerId/:view',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER_CREDIT'],
            pageTitle: 'niopdcgatewayApp.customerCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/person/:personId/:view',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PERSON_CREDIT'],
            pageTitle: 'niopdcgatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'sell-contract-product-credit/:id/sell-contract-product/:sellContractProductId/:view',
        component: CustomerCreditPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CUSTOMER_CREDIT', 'VIEW_PERSON_CREDIT'],
            pageTitle: 'niopdcgatewayApp.personCredit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
