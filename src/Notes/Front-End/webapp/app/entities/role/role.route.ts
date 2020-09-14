import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RoleComponent} from './role.component';
import {RolePopupComponent} from './role-dialog.component';
import {RoleDeletePopupComponent} from './role-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class RoleResolvePagingParams implements Resolve<any> {

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

export const roleRoute: Routes = [
    {
        path: '',
        component: RoleComponent,
        resolve: {
            'pagingParams': RoleResolvePagingParams
        },
        data: {
            authorities: ['LIST_ROLE', 'ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.role.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolePopupRoute: Routes = [
    {
        path: 'new',
        component: RolePopupComponent,
        data: {
            authorities: ['CREATE_ROLE', 'ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: RolePopupComponent,
        data: {
            authorities: ['EDIT_ROLE', 'ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: RoleDeletePopupComponent,
        data: {
            authorities: ['DELETE_ROLE', 'ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: RolePopupComponent,
        data: {
            authorities: ['VIEW_ROLE', 'ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
