import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CostElementComponent} from './cost-element.component';
import {CostElementPopupComponent} from './cost-element-dialog.component';
import {CostElementDeletePopupComponent} from './cost-element-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CostElementResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const costElementRoute: Routes = [
    {
        path: '',
        component: CostElementComponent,
        resolve: {
            'pagingParams': CostElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_COST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.costElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cost-group/:costGroupId/cost/:costId/cost-element',
        component: CostElementComponent,
        resolve: {
            'pagingParams': CostElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_COST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.costElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cost-group/:costGroupId/cost/:parentCostId/cost/:costId/cost-element',
        component: CostElementComponent,
        resolve: {
            'pagingParams': CostElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_COST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.costElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costElementPopupRoute: Routes = [
    {
        path: 'new/cost-group/:costGroupId',
        component: CostElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_COST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.costElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/cost-group/:costGroupId/cost/:costId',
        component: CostElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_COST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.costElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: CostElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_COST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.costElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CostElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_COST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.costElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: CostElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_COST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.costElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
