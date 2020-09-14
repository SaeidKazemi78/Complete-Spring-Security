import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CostComponent} from './cost.component';
import {CostPopupComponent} from './cost-dialog.component';
import {CostDeletePopupComponent} from './cost-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class CostResolvePagingParams implements Resolve<any> {

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

export const costRoute: Routes = [
    {
        path: '',
        component: CostComponent,
        resolve: {
            'pagingParams': CostResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_COST'],
            pageTitle: 'niopdcgatewayApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costPopupRoute: Routes = [
    {
        path: 'new/cost-group/:costGroupId',
        component: CostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_COST'],
            pageTitle: 'niopdcgatewayApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/cost/:costId',
        component: CostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_COST'],
            pageTitle: 'niopdcgatewayApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/cost-group/:costGroupId/edit',
        component: CostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_COST'],
            pageTitle: 'niopdcgatewayApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/cost/:costId/edit',
        component: CostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_COST'],
            pageTitle: 'niopdcgatewayApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CostDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_COST'],
            pageTitle: 'niopdcgatewayApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/cost-group/:costGroupId/:view',
        component: CostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_COST'],
            pageTitle: 'niopdcgatewayApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/cost/:costId/:view',
        component: CostPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_COST'],
            pageTitle: 'niopdcgatewayApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
