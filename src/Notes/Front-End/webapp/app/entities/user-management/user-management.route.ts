import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserManagementComponent} from './user-management.component';
import {UserManagementPopupComponent} from './user-management-dialog.component';
import {UserManagementDeletePopupComponent} from './user-management-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class UserManagementResolvePagingParams implements Resolve<any> {

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

export const userManagementRoute: Routes = [
    {
        path: '',
        component: UserManagementComponent,
        resolve: {
            'pagingParams': UserManagementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':username/ip-filter',
        loadChildren: '../ip-filter/ip-filter.module#NiopdcgatewayIpFilterModule'
    },
    {
        path: ':username/user-token',
        loadChildren: '../user-token/user-token.module#NiopdcgatewayUserTokenModule'
    },

];

export const userManagementPopupRoute: Routes = [
    {
        path: 'new',
        component: UserManagementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':login/edit',
        component: UserManagementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':login/delete',
        component: UserManagementDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-request/:id/confirm/:username',
        component: UserManagementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_USER_REQUEST'],
            pageTitle: 'userRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':login/:view',
        component: UserManagementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_USER'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
