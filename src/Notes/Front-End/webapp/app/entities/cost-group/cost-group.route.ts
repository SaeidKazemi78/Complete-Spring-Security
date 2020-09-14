import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CostGroupComponent} from './cost-group.component';
import {CostGroupPopupComponent} from './cost-group-dialog.component';
import {CostGroupDeletePopupComponent} from './cost-group-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CostGroupResolvePagingParams implements Resolve<any> {

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

export const costGroupRoute: Routes = [
    {
        path: '',
        component: CostGroupComponent,
        resolve: {
            'pagingParams': CostGroupResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_COST_GROUP_TRADE', 'LIST_COST_GROUP_FINANCIAL'],
            pageTitle: 'niopdcgatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':costGroupId/cost-element',
        loadChildren: '../cost-element/cost-element.module#NiopdcgatewayCostElementModule'
    },
    {
        path: ':costGroupId/cost/:costId/cost-rate',
        loadChildren: '../cost-rate/cost-rate.module#NiopdcgatewayCostRateModule'
    },
    {
        path: ':costGroupId/cost/:costId/cost',
        loadChildren: '../cost/cost.module#NiopdcgatewayCostModule'
    },
    {
        path: ':costGroupId/cost',
        loadChildren: '../cost/cost.module#NiopdcgatewayCostModule'
    },
];

export const costGroupPopupRoute: Routes = [
    {
        path: 'new',
        component: CostGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_COST_GROUP_TRADE', 'CREATE_COST_GROUP_FINANCIAL'],
            pageTitle: 'niopdcgatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CostGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_COST_GROUP_FINANCIAL', 'EDIT_COST_GROUP_TRADE'],
            pageTitle: 'niopdcgatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CostGroupDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_COST_GROUP_TRADE', 'DELETE_COST_GROUP_FINANCIAL'],
            pageTitle: 'niopdcgatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CostGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_COST_GROUP_FINANCIAL', 'VIEW_COST_GROUP_TRADE'],
            pageTitle: 'niopdcgatewayApp.costGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
