import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {SellContractComponent} from './sell-contract.component';
import {SellContractDialogComponent} from './sell-contract-dialog.component';
import {SellContractDeletePopupComponent} from './sell-contract-delete-dialog.component';
import {SellContractConfirmPopupComponent} from './sell-contract-confirm-dialog.component';
import {TransferQuotaPopupDialogComponent} from './transfer-quota-dialog.component';

@Injectable({ providedIn: 'root' })
export class SellContractResolvePagingParams implements Resolve<any> {

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

export const sellContractRoute: Routes = [
    {
        path: '',
        component: SellContractComponent,
        resolve: {
            'pagingParams': SellContractResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SELL_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: ':id/addendum',
        component: SellContractComponent,
        resolve: {
            'pagingParams': SellContractResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SELL_CONTRACT_ADDENDUM'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title',
            addendum: true
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SellContractDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_SELL_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title'
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/transfer-quota',
        component: TransferQuotaPopupDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'TRANSFER_QUOTA'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: SellContractDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SELL_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title'
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/edit-addendum',
        component: SellContractDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SELL_CONTRACT_ADDENDUM'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title'
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/view',
        component: SellContractDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SELL_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title',
            isView: true
        },
        canActivate: [UserRouteAccessService],
    }
];

export const sellContractPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SellContractDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SELL_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: ':id/confirm',
        component: SellContractConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_SELL_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.sellContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
