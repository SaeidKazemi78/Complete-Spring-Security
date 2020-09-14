import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ITEMS_PER_PAGE, UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserConfigComponent } from './user-config.component';
import { UserConfigPopupComponent } from './user-config-dialog.component';
import { UserConfigDeletePopupComponent } from './user-config-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class UserConfigResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const userConfigRoute: Routes = [
    {
        path: 'user-config',
        component: UserConfigComponent,
        resolve: {
            'pagingParams': UserConfigResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_USER_CONFIG'],
            pageTitle: 'niopdcgatewayApp.userConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userConfigPopupRoute: Routes = [
    {
        path: 'user-config-new',
        component: UserConfigPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','CREATE_USER_CONFIG'],
            pageTitle: 'niopdcgatewayApp.userConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-config/:id/edit',
        component: UserConfigPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','EDIT_USER_CONFIG'],
            pageTitle: 'niopdcgatewayApp.userConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-config/:id/delete',
        component: UserConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','DELETE_USER_CONFIG'],
            pageTitle: 'niopdcgatewayApp.userConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-config/:id/:view',
        component: UserConfigPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','VIEW_USER_CONFIG'],
            pageTitle: 'niopdcgatewayApp.userConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
