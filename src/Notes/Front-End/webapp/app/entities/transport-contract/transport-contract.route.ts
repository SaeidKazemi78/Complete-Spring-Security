import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {TransportContractComponent} from './transport-contract.component';
import {TransportContractPopupComponent} from './transport-contract-dialog.component';
import {TransportContractDeletePopupComponent} from './transport-contract-delete-dialog.component';
import {TransportContractConfirmPopupComponent} from './transport-contract-confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class TransportContractResolvePagingParams implements Resolve<any> {

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

export const transportContractRoute: Routes = [
    {
        path: '',
        component: TransportContractComponent,
        resolve: {
            'pagingParams': TransportContractResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TRANSPORT_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car/:carId/transport-contract',
        component: TransportContractComponent,
        resolve: {
            'pagingParams': TransportContractResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_TRANSPORT_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportContractPopupRoute: Routes = [
    {
        path: 'new/:id/:mode',
        component: TransportContractPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_TRANSPORT_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: TransportContractPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_TRANSPORT_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: TransportContractDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_TRANSPORT_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/confirm',
        component: TransportContractConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_TRANSPORT_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/revert-confirm',
        component: TransportContractConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'REVERT_CONFIRM_TRANSPORT_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: TransportContractPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_TRANSPORT_CONTRACT'],
            pageTitle: 'niopdcgatewayApp.transportContract.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
