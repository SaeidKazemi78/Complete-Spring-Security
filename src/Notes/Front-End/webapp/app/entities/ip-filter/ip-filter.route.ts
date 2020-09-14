import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {IpFilterComponent} from './ip-filter.component';
import {IpFilterPopupComponent} from './ip-filter-dialog.component';
import {IpFilterDeletePopupComponent} from './ip-filter-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class IpFilterResolvePagingParams implements Resolve<any> {

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

export const ipFilterRoute: Routes = [
    {
        path: '',
        component: IpFilterComponent,
        resolve: {
            'pagingParams': IpFilterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_IP_FILTER'],
            pageTitle: 'niopdcgatewayApp.ipFilter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ipFilterPopupRoute: Routes = [
    {
        path: 'new/:username',
        component: IpFilterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_IP_FILTER'],
            pageTitle: 'niopdcgatewayApp.ipFilter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:username/edit',
        component: IpFilterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_IP_FILTER'],
            pageTitle: 'niopdcgatewayApp.ipFilter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: IpFilterDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_IP_FILTER'],
            pageTitle: 'niopdcgatewayApp.ipFilter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: IpFilterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_IP_FILTER'],
            pageTitle: 'niopdcgatewayApp.ipFilter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
