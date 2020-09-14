import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {DepotComponent} from './depot.component';
import {DepotPopupComponent} from './depot-dialog.component';
import {DepotDeletePopupComponent} from './depot-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class DepotResolvePagingParams implements Resolve<any> {

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

export const depotRoute: Routes = [
    {
        path: '',
        component: DepotComponent,
        resolve: {
            'pagingParams': DepotResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DEPOT'],
            pageTitle: 'niopdcgatewayApp.depot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const depotPopupRoute: Routes = [
    {
        path: 'new',
        component: DepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_DEPOT'],
            pageTitle: 'niopdcgatewayApp.depot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: DepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_DEPOT'],
            pageTitle: 'niopdcgatewayApp.depot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: DepotDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_DEPOT'],
            pageTitle: 'niopdcgatewayApp.depot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: DepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_DEPOT'],
            pageTitle: 'niopdcgatewayApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
