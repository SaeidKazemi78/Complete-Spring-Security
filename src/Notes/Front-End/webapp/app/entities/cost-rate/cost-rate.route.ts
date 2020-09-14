import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CostRateComponent} from './cost-rate.component';
import {CostRatePopupComponent} from './cost-rate-dialog.component';
import {CostRateDeletePopupComponent} from './cost-rate-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class CostRateResolvePagingParams implements Resolve<any> {

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

export const costRateRoute: Routes = [
    {
        path: '',
        component: CostRateComponent,
        resolve: {
            'pagingParams': CostRateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_COST_RATE'],
            pageTitle: 'niopdcgatewayApp.costRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costRatePopupRoute: Routes = [
    {
        path: 'new/:costId',
        component: CostRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_COST_RATE'],
            pageTitle: 'niopdcgatewayApp.costRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/cost/:costId/edit',
        component: CostRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_COST_RATE'],
            pageTitle: 'niopdcgatewayApp.costRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: CostRateDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_COST_RATE'],
            pageTitle: 'niopdcgatewayApp.costRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/cost/:costId/:view',
        component: CostRatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_COST_RATE'],
            pageTitle: 'niopdcgatewayApp.costRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
