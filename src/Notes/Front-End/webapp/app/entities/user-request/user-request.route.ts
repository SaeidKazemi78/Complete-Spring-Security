import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserRequestComponent} from './user-request.component';
import {UserRequestPopupComponent} from './user-request-dialog.component';
import {UserRequestDeletePopupComponent} from './user-request-delete-dialog.component';
import {UserManagementPopupComponent} from 'app/entities/user-management';

@Injectable({providedIn: 'root'})
export class UserRequestResolvePagingParams implements Resolve<any> {

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

export const userRequestRoute: Routes = [
    {
        path: '',
        component: UserRequestComponent,
        resolve: {
            'pagingParams': UserRequestResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_USER_REQUEST'],
            pageTitle: 'userManagement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userRequestPopupRoute: Routes = [

    {
        path: 'user-request/:id/delete',
        component: UserRequestDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_USER_REQUEST'],
            pageTitle: 'userRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-request/:id/view',
        component: UserRequestPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_USER_REQUEST'],
            pageTitle: 'userRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
