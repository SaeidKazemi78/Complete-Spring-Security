import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import { ConsumptionComponent } from './consumption.component';
import { ConsumptionPopupComponent } from './consumption-dialog.component';
import { ConsumptionDeletePopupComponent } from './consumption-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConsumptionResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

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

export const consumptionRoute: Routes = [
    {
        path: '',
        component: ConsumptionComponent,
        resolve: {
            'pagingParams': ConsumptionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CONSUMPTION'],
            pageTitle: 'niopdcgatewayApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consumptionPopupRoute: Routes = [
    {
        path: 'new',
        component: ConsumptionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CONSUMPTION'],
            pageTitle: 'niopdcgatewayApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ConsumptionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CONSUMPTION'],
            pageTitle: 'niopdcgatewayApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ConsumptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CONSUMPTION'],
            pageTitle: 'niopdcgatewayApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/view',
        component: ConsumptionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CONSUMPTION'],
            pageTitle: 'niopdcgatewayApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
