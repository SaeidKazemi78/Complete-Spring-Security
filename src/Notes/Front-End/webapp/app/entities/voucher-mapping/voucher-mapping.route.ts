import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {VoucherMappingComponent} from './voucher-mapping.component';
import {VoucherMappingPopupComponent} from './voucher-mapping-dialog.component';
import {VoucherMappingDeletePopupComponent} from './voucher-mapping-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class VoucherMappingResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            size: this.paginationUtil.parsePage(size),
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const voucherMappingRoute: Routes = [
    {
        path: '',
        component: VoucherMappingComponent,
        resolve: {
            'pagingParams': VoucherMappingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VOUCHER_MAPPING'],
            pageTitle: 'niopdcgatewayApp.voucherMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voucherMappingPopupRoute: Routes = [
    {
        path: 'new',
        component: VoucherMappingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_VOUCHER_MAPPING'],
            pageTitle: 'niopdcgatewayApp.voucherMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: VoucherMappingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_VOUCHER_MAPPING'],
            pageTitle: 'niopdcgatewayApp.voucherMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: VoucherMappingDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VOUCHER_MAPPING'],
            pageTitle: 'niopdcgatewayApp.voucherMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: VoucherMappingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_VOUCHER_MAPPING'],
            pageTitle: 'niopdcgatewayApp.voucherMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
