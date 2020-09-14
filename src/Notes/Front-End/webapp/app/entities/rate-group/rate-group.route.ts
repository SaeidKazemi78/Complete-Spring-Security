import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RateGroupComponent} from './rate-group.component';
import {RateGroupPopupComponent} from './rate-group-dialog.component';
import {RateGroupDeletePopupComponent} from './rate-group-delete-dialog.component';
import {RateGroupArchivePopupComponent} from './rate-group-archive-dialog.component';

@Injectable({ providedIn: 'root' })
export class RateGroupResolvePagingParams implements Resolve<any> {

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

export const rateGroupRoute: Routes = [
    {
        path: '',
        component: RateGroupComponent,
        resolve: {
            'pagingParams': RateGroupResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.rateGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':rateGroupId/product-rate/:type',
        loadChildren: '../product-rate/product-rate.module#NiopdcgatewayProductRateModule'
    },
];

export const rateGroupPopupRoute: Routes = [
    {
        path: 'new',
        component: RateGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.rateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: RateGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.rateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: RateGroupDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.rateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/archive',
        component: RateGroupArchivePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ARCHIVE_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.rateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: RateGroupPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_RATE_GROUP'],
            pageTitle: 'niopdcgatewayApp.rateGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
