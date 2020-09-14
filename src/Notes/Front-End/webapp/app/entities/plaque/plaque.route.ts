import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {PlaqueComponent} from './plaque.component';
import {PlaquePopupComponent} from './plaque-dialog.component';
import {PlaqueDeletePopupComponent} from './plaque-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class PlaqueResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const plaqueRoute: Routes = [
    {
        path: '',
        component: PlaqueComponent,
        resolve: {
            'pagingParams': PlaqueResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PLAQUE'],
            pageTitle: 'niopdcgatewayApp.plaque.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':plaqueId/plaque-rule',
        loadChildren: '../plaque-rule/plaque-rule.module#NiopdcgatewayPlaqueRuleModule'
    },
];

export const plaquePopupRoute: Routes = [
    {
        path: 'new',
        component: PlaquePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PLAQUE'],
            pageTitle: 'niopdcgatewayApp.plaque.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: PlaquePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PLAQUE'],
            pageTitle: 'niopdcgatewayApp.plaque.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: PlaqueDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PLAQUE'],
            pageTitle: 'niopdcgatewayApp.plaque.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: PlaquePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PLAQUE'],
            pageTitle: 'niopdcgatewayApp.plaque.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
