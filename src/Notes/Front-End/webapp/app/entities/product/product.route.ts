import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {ProductComponent} from './product.component';
import {ProductPopupComponent} from './product-dialog.component';
import {ProductDeletePopupComponent} from './product-delete-dialog.component';
import {ProductRateGroupComponent} from './product-rate-group.component';
import {ProductCostGroupComponent} from './product-cost-group.component';
import {ProductSrc, ProductSrcComponent} from 'app/entities/product-src';

@Injectable({ providedIn: 'root' })
export class ProductResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'title,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const productRoute: Routes = [
    {
        path: '',
        component: ProductComponent,
        resolve: {
            'pagingParams': ProductResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':productId/customer-type-product-consumption',
        loadChildren: '../customer-type-product-consumption/customer-type-product-consumption.module#NiopdcgatewayCustomerTypeProductConsumptionModule'
    },
    // {
    //     path: ':productId/rate-groups',
    //     component: ProductRateGroupComponent,
    //     resolve: {
    //         'pagingParams': ProductResolvePagingParams
    //     },
    //     data: {
    //         authorities: ['ROLE_ADMIN', 'LIST_RATE_GROUP'],
    //         pageTitle: 'niopdcgatewayApp.rateGroup.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
    // {
    //     path: ':productId/cost-groups',
    //     component: ProductCostGroupComponent,
    //     resolve: {
    //         'pagingParams': ProductResolvePagingParams
    //     },
    //     data: {
    //         authorities: ['ROLE_ADMIN', 'List_COST_GROUP'],
    //         pageTitle: 'niopdcgatewayApp.costGroup.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // }
];

export const productPopupRoute: Routes = [
    {
        path: 'new',
        component: ProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ProductPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
