import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ProductGroupComponent} from './product-group.component';
import {ProductGroupPopupComponent} from './product-group-dialog.component';
import {ProductGroupDeletePopupComponent} from './product-group-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ProductGroupResolvePagingParams implements Resolve<any> {

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

export const productGroupRoute: Routes = [
    {
        path: '',
        component: ProductGroupComponent,
        resolve: {
            'pagingParams': ProductGroupResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PRODUCT_GROUP'],
            pageTitle: 'niopdcgatewayApp.productGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productGroupPopupRoute: Routes = [
    {
        path: 'new',
        component: ProductGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PRODUCT_GROUP'],
            pageTitle: 'niopdcgatewayApp.productGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ProductGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PRODUCT_GROUP'],
            pageTitle: 'niopdcgatewayApp.productGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ProductGroupDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PRODUCT_GROUP'],
            pageTitle: 'niopdcgatewayApp.productGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ProductGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PRODUCT_GROUP'],
            pageTitle: 'niopdcgatewayApp.productGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
