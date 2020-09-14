import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {BoundaryDiscountComponent} from './boundary-discount.component';
import {BoundaryDiscountPopupComponent} from './boundary-discount-dialog.component';
import {BoundaryDiscountDeletePopupComponent} from './boundary-discount-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class BoundaryDiscountResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const boundaryDiscountRoute: Routes = [
    {
        path: '',
        component: BoundaryDiscountComponent,
        resolve: {
            'pagingParams': BoundaryDiscountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BOUNDARY_DISCOUNT'],
            pageTitle: 'niopdcgatewayApp.boundaryDiscount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const boundaryDiscountPopupRoute: Routes = [
    {
        path: 'new',
        component: BoundaryDiscountPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_BOUNDARY_DISCOUNT'],
            pageTitle: 'niopdcgatewayApp.boundaryDiscount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: BoundaryDiscountPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BOUNDARY_DISCOUNT'],
            pageTitle: 'niopdcgatewayApp.boundaryDiscount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: BoundaryDiscountDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_BOUNDARY_DISCOUNT'],
            pageTitle: 'niopdcgatewayApp.boundaryDiscount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: BoundaryDiscountPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_BOUNDARY_DISCOUNT'],
            pageTitle: 'niopdcgatewayApp.boundaryDiscount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
