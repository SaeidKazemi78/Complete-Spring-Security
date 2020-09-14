import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserTokenComponent} from './user-token.component';
import {UserTokenPopupComponent} from './user-token-dialog.component';
import {UserTokenDeletePopupComponent} from './user-token-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class UserTokenResolvePagingParams implements Resolve<any> {

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

export const userTokenRoute: Routes = [
    {
        path: '',
        component: UserTokenComponent,
        resolve: {
            'pagingParams': UserTokenResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_USER_TOKEN'],
            pageTitle: 'niopdcgatewayApp.userToken.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userTokenPopupRoute: Routes = [
    {
        path: 'new/:username',
        component: UserTokenPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_USER_TOKEN'],
            pageTitle: 'niopdcgatewayApp.userToken.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: UserTokenPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_USER_TOKEN'],
            pageTitle: 'niopdcgatewayApp.userToken.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: UserTokenDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_USER_TOKEN'],
            pageTitle: 'niopdcgatewayApp.userToken.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: UserTokenPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_USER_TOKEN'],
            pageTitle: 'niopdcgatewayApp.userToken.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
