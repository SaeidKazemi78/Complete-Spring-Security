import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RegionComponent} from './region.component';
import {RegionPopupComponent} from './region-dialog.component';
import {RegionDeletePopupComponent} from './region-delete-dialog.component';
import {RegionFilePopupComponent} from './region-file-dialog.component';

@Injectable({ providedIn: 'root' })
export class RegionResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'name,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const regionRoute: Routes = [
    {
        path: '',
        component: RegionComponent,
        resolve: {
            'pagingParams': RegionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REGION'],
            pageTitle: 'niopdcgatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':regionId/sub-region',
        loadChildren: '../region/region.module#NiopdcgatewayRegionModule'
    },
];

export const regionPopupRoute: Routes = [
    {
        path: ':parent/:parentId/new',
        component: RegionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REGION'],
            pageTitle: 'niopdcgatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: RegionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REGION'],
            pageTitle: 'niopdcgatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: RegionDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REGION'],
            pageTitle: 'niopdcgatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: RegionPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REGION'],
            pageTitle: 'niopdcgatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'excel',
        component: RegionFilePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'REGION_EXCEL'],
            pageTitle: 'niopdcgatewayApp.region.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
