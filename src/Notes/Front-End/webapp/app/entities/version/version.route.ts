import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {VersionComponent} from './version.component';
import {VersionPopupComponent} from './version-dialog.component';
import {VersionDeletePopupComponent} from './version-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class VersionResolvePagingParams implements Resolve<any> {

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

export const versionRoute: Routes = [
    {
        path: '',
        component: VersionComponent,
        resolve: {
            'pagingParams': VersionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VERSION'],
            pageTitle: 'niopdcgatewayApp.version.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const versionPopupRoute: Routes = [
    {
        path: 'new',
        component: VersionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_VERSION'],
            pageTitle: 'niopdcgatewayApp.version.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: VersionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_VERSION'],
            pageTitle: 'niopdcgatewayApp.version.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: VersionDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VERSION'],
            pageTitle: 'niopdcgatewayApp.version.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: VersionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_VERSION'],
            pageTitle: 'niopdcgatewayApp.version.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
