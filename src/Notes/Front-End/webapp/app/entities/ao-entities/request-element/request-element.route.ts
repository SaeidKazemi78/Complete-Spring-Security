import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {RequestElementComponent} from './request-element.component';
import {RequestElementPopupComponent} from './request-element-dialog.component';
import {RequestElementDeletePopupComponent} from './request-element-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class RequestElementResolvePagingParams implements Resolve<any> {

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

export const requestElementRoute: Routes = [
    {
        path: 'request-filter-element/:requestFilterElementId/request-element',
        component: RequestElementComponent,
        resolve: {
            'pagingParams': RequestElementResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REQUEST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestElement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const requestElementPopupRoute: Routes = [
    {
        path: 'request-element-new/:requestFilterElementId',
        component: RequestElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REQUEST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-element/:id/edit',
        component: RequestElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REQUEST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-element/:id/delete',
        component: RequestElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REQUEST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'request-element/:id/:view',
        component: RequestElementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REQUEST_ELEMENT'],
            pageTitle: 'niopdcgatewayApp.requestElement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
