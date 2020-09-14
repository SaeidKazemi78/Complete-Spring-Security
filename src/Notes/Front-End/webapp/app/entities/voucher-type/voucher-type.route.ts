import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {VoucherTypeComponent} from './voucher-type.component';
import {VoucherTypePopupComponent} from './voucher-type-dialog.component';
import {VoucherTypeDeletePopupComponent} from './voucher-type-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class VoucherTypeResolvePagingParams implements Resolve<any> {

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

export const voucherTypeRoute: Routes = [
    {
        path: '',
        component: VoucherTypeComponent,
        resolve: {
            'pagingParams': VoucherTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VOUCHER_TYPE'],
            pageTitle: 'niopdcgatewayApp.voucherType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voucherTypePopupRoute: Routes = [
    {
        path: 'new/:voucherTypeGroupId',
        component: VoucherTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_VOUCHER_TYPE'],
            pageTitle: 'niopdcgatewayApp.voucherType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: VoucherTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_VOUCHER_TYPE'],
            pageTitle: 'niopdcgatewayApp.voucherType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: VoucherTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VOUCHER_TYPE'],
            pageTitle: 'niopdcgatewayApp.voucherType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: VoucherTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_VOUCHER_TYPE'],
            pageTitle: 'niopdcgatewayApp.voucherType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
