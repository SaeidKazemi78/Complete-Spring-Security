import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {PlaqueRuleComponent} from './plaque-rule.component';
import {PlaqueRulePopupComponent} from './plaque-rule-dialog.component';
import {PlaqueRuleDeletePopupComponent} from './plaque-rule-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class PlaqueRuleResolvePagingParams implements Resolve<any> {

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

export const plaqueRuleRoute: Routes = [
    {
        path: '',
        component: PlaqueRuleComponent,
        resolve: {
            'pagingParams': PlaqueRuleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PLAQUE_RULE'],
            pageTitle: 'niopdcgatewayApp.plaqueRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const plaqueRulePopupRoute: Routes = [
    {
        path: 'new/:plaqueId',
        component: PlaqueRulePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PLAQUE_RULE'],
            pageTitle: 'niopdcgatewayApp.plaqueRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: PlaqueRulePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PLAQUE_RULE'],
            pageTitle: 'niopdcgatewayApp.plaqueRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: PlaqueRuleDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PLAQUE_RULE'],
            pageTitle: 'niopdcgatewayApp.plaqueRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: PlaqueRulePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PLAQUE_RULE'],
            pageTitle: 'niopdcgatewayApp.plaqueRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
