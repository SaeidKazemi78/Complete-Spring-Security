import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {TransferTypeComponent} from './transfer-type.component';
import {TransferTypePopupComponent} from './transfer-type-dialog.component';
import {TransferTypeDeletePopupComponent} from './transfer-type-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class TransferTypeResolvePagingParams implements Resolve<any> {

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

export const transferTypeRoute: Routes = [
    {
        path: '',
        component: TransferTypeComponent,
        resolve: {
            'pagingParams': TransferTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TRANSFER_TYPE'],
            pageTitle: 'niopdcgatewayApp.transferType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transferTypePopupRoute: Routes = [
    {
        path: 'new',
        component: TransferTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TRANSFER_TYPE'],
            pageTitle: 'niopdcgatewayApp.transferType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: TransferTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_TRANSFER_TYPE'],
            pageTitle: 'niopdcgatewayApp.transferType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: TransferTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_TRANSFER_TYPE'],
            pageTitle: 'niopdcgatewayApp.transferType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: TransferTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_TRANSFER_TYPE'],
            pageTitle: 'niopdcgatewayApp.transferType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
