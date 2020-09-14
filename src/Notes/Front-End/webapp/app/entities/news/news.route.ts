import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {NewsComponent} from './news.component';
import {NewsPopupComponent} from './news-dialog.component';
import {NewsDeletePopupComponent} from './news-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class NewsResolvePagingParams implements Resolve<any> {

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

export const newsRoute: Routes = [
    {
        path: '',
        component: NewsComponent,
        resolve: {
            'pagingParams': NewsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_NEWS'],
            pageTitle: 'niopdcgatewayApp.news.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const newsPopupRoute: Routes = [
    {
        path: 'new',
        component: NewsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_NEWS'],
            pageTitle: 'niopdcgatewayApp.news.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: NewsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_NEWS'],
            pageTitle: 'niopdcgatewayApp.news.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: NewsDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_NEWS'],
            pageTitle: 'niopdcgatewayApp.news.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: NewsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_NEWS'],
            pageTitle: 'niopdcgatewayApp.news.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
