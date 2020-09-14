import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {LogBookComponent} from './log-book.component';
import {LogBookPopupComponent} from './log-book-dialog.component';
import {LogBookDeletePopupComponent} from './log-book-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class LogBookResolvePagingParams implements Resolve<any> {

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

export const logBookRoute: Routes = [
    {
        path: '',
        component: LogBookComponent,
        resolve: {
            'pagingParams': LogBookResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LOG_BOOK'],
            pageTitle: 'niopdcgatewayApp.logBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const logBookPopupRoute: Routes = [
    {
        path: 'log-book-new/:dayDepotId',
        component: LogBookPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_LOG_BOOK'],
            pageTitle: 'niopdcgatewayApp.logBook.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: LogBookPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_LOG_BOOK'],
            pageTitle: 'niopdcgatewayApp.logBook.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: LogBookDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_LOG_BOOK'],
            pageTitle: 'niopdcgatewayApp.logBook.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: LogBookPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_LOG_BOOK'],
            pageTitle: 'niopdcgatewayApp.logBook.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
