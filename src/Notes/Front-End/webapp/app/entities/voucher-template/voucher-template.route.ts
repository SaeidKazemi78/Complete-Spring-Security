import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {VoucherTemplateComponent} from './voucher-template.component';
import {VoucherTemplateDialogComponent} from './voucher-template-dialog.component';
import {VoucherTemplateDeletePopupComponent} from './voucher-template-delete-dialog.component';
import {VoucherTemplateExecuteQueryPopupComponent} from './voucher-template-execute-query-dialog.component';

@Injectable({ providedIn: 'root' })
export class VoucherTemplateResolvePagingParams implements Resolve<any> {

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

export const voucherTemplateRoute: Routes = [
    {
        path: '',
        component: VoucherTemplateComponent,
        resolve: {
            'pagingParams': VoucherTemplateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VOUCHER_TEMPLATE'],
            pageTitle: 'niopdcgatewayApp.voucherTemplate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voucherTemplatePopupRoute: Routes = [
    {
        path: 'new',
        component: VoucherTemplateDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_VOUCHER_TEMPLATE'],
            pageTitle: 'niopdcgatewayApp.voucherTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        // outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: VoucherTemplateDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_VOUCHER_TEMPLATE'],
            pageTitle: 'niopdcgatewayApp.voucherTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        // outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: VoucherTemplateDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VOUCHER_TEMPLATE'],
            pageTitle: 'niopdcgatewayApp.voucherTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/execute-query',
        component: VoucherTemplateExecuteQueryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EXECUTE_QUERY_VOUCHER_TEMPLATE'],
            pageTitle: 'niopdcgatewayApp.voucherTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: VoucherTemplateDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_VOUCHER_TEMPLATE'],
            pageTitle: 'niopdcgatewayApp.voucherTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
