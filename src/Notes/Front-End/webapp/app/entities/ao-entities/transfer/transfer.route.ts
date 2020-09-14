import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {TransferComponent} from './transfer.component';
import {TransferPopupComponent} from './transfer-dialog.component';
import {TransferDeletePopupComponent} from './transfer-delete-dialog.component';
import {TransferUnitToDirtyPopupComponent} from './transfer-unit-to-dirty-dialog.component';
import {TransferDepotToDirtyPopupComponent} from './transfer-depot-to-dirty-dialog.component';

@Injectable({providedIn: 'root'})
export class TransferResolvePagingParams implements Resolve<any> {

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

export const transferRoute: Routes = [
    {
        path: '',
        component: TransferComponent,
        resolve: {
            'pagingParams': TransferResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TRANSFER'],
            pageTitle: 'niopdcgatewayApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transferDirtyPopupRoute: Routes = [
    {
        path: 'new/unit-to-dirty/:mainDayOperationId',
        component: TransferUnitToDirtyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TRANSFER'],
            pageTitle: 'niopdcgatewayApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/depot-to-dirty/:mainDayDepotId',
        component: TransferDepotToDirtyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TRANSFER'],
            pageTitle: 'niopdcgatewayApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];

export const transferPopupRoute: Routes = [
    {
        path: 'new/:dayDepotId',
        component: TransferPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TRANSFER'],
            pageTitle: 'niopdcgatewayApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: TransferPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_TRANSFER'],
            pageTitle: 'niopdcgatewayApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: TransferDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_TRANSFER'],
            pageTitle: 'niopdcgatewayApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: TransferPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_TRANSFER'],
            pageTitle: 'niopdcgatewayApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
