import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ParentAuthorityComponent} from './parent-authority.component';
import {ParentAuthorityPopupComponent} from './parent-authority-dialog.component';
import {ParentAuthorityDeletePopupComponent} from './parent-authority-delete-dialog.component';
import {MainAuthorityComponent, MainAuthorityResolvePagingParams} from 'app/entities/main-authority';

@Injectable({ providedIn: 'root' })
export class ParentAuthorityResolvePagingParams implements Resolve<any> {

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

export const parentAuthorityRoute: Routes = [
    {
        path: '',
        component: ParentAuthorityComponent,
        resolve: {
            'pagingParams': ParentAuthorityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.parentAuthority.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':parentAuthorityId/main-authority',
        loadChildren: '../main-authority/main-authority.module#NiopdcgatewayMainAuthorityModule'
    },
];

export const parentAuthorityPopupRoute: Routes = [
    {
        path: 'new',
        component: ParentAuthorityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.parentAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ParentAuthorityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.parentAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ParentAuthorityDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.parentAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ParentAuthorityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.parentAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
