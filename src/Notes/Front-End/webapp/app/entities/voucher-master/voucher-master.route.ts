import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {VoucherMasterComponent} from './voucher-master.component';
import {VoucherMasterPopupComponent} from './voucher-master-dialog.component';
import {VoucherMasterDeletePopupComponent} from './voucher-master-delete-dialog.component';
import {VoucherReportComponent} from './voucher-report.component';
import {VoucherMasterConfirmPopupComponent} from './voucher-master-confirm-dialog.component';
import {VoucherMasterRevertConfirmPopupComponent} from './voucher-master-revert-confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class VoucherMasterResolvePagingParams implements Resolve<any> {

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

export const voucherMasterRoute: Routes = [
    {
        path: '',
        component: VoucherMasterComponent,
        resolve: {
            'pagingParams': VoucherMasterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VOUCHER_MASTER'],
            pageTitle: 'niopdcgatewayApp.voucherMaster.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':voucherMasterId/report',
        component: VoucherReportComponent,
        resolve: {
            'pagingParams': VoucherMasterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VOUCHER_MASTER'],
            pageTitle: 'niopdcgatewayApp.voucherMaster.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voucherMasterPopupRoute: Routes = [
    {
        path: 'new',
        component: VoucherMasterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_VOUCHER_MASTER'],
            pageTitle: 'niopdcgatewayApp.voucherMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: VoucherMasterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_VOUCHER_MASTER'],
            pageTitle: 'niopdcgatewayApp.voucherMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: VoucherMasterDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VOUCHER_MASTER'],
            pageTitle: 'niopdcgatewayApp.voucherMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/revert-confirm',
        component: VoucherMasterRevertConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VOUCHER_MASTER'],
            pageTitle: 'niopdcgatewayApp.voucherMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/confirm',
        component: VoucherMasterConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_VOUCHER_MASTER'],
            pageTitle: 'niopdcgatewayApp.voucherMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: VoucherMasterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_VOUCHER_MASTER'],
            pageTitle: 'niopdcgatewayApp.voucherMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
