import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {FilterComponent} from './filter.component';
import {FilterPopupComponent} from './filter-dialog.component';
import {FilterDeletePopupComponent} from './filter-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class FilterResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

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

export const filterRoute: Routes = [
    {
        path: '',
        component: FilterComponent,
        resolve: {
            'pagingParams': FilterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_FILTER'],
            pageTitle: 'niopdcgatewayApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':filterId/element',
        loadChildren : '../element/element.module#NiopdcgatewayElementModule'
    }
];

export const filterPopupRoute: Routes = [
    {
        path: 'new',
        component: FilterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_FILTER'],
            pageTitle: 'niopdcgatewayApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: FilterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_FILTER'],
            pageTitle: 'niopdcgatewayApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: FilterDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_FILTER'],
            pageTitle: 'niopdcgatewayApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: FilterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_FILTER'],
            pageTitle: 'niopdcgatewayApp.filter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
