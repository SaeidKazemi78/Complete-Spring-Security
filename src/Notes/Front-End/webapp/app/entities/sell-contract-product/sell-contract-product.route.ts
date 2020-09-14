import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {SellContractProductComponent} from './sell-contract-product.component';
import {SellContractProductPopupComponent} from './sell-contract-product-dialog.component';
import {SellContractProductDeletePopupComponent} from './sell-contract-product-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class SellContractProductResolvePagingParams implements Resolve<any> {

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

export const sellContractProductRoute: Routes = [
    {
        path: '',
        component: SellContractProductComponent,
        resolve: {
            'pagingParams': SellContractProductResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SELL_CONTRACT_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sellContractProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':sellContractProductId/sell-contract-product-credit',
        loadChildren: '../customer-credit/customer-credit.module#NiopdcgatewayCustomerCreditModule'
    }
];

export const sellContractProductPopupRoute: Routes = [
    {
        path: 'new/:sellContractId',
        component: SellContractProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_SELL_CONTRACT_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sellContractProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: SellContractProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SELL_CONTRACT_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sellContractProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: SellContractProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SELL_CONTRACT_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sellContractProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: SellContractProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SELL_CONTRACT_PRODUCT', 'ADJUSTMENT_SELL_CONTRACT_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.sellContractProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
