import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ResponsePlungingComponent} from './response-plunging.component';
import {ResponsePlungingPopupComponent} from './response-plunging-dialog.component';
import {ResponsePlungingDeletePopupComponent} from './response-plunging-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ResponsePlungingResolvePagingParams implements Resolve<any> {

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

export const responsePlungingRoute: Routes = [
    {
        path: '',
        component: ResponsePlungingComponent,
        resolve: {
            'pagingParams': ResponsePlungingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_RESPONSE_PLUNGING'],
            pageTitle: 'niopdcgatewayApp.responsePlunging.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const responsePlungingPopupRoute: Routes = [
    {
        path: 'new/:requestPlungingId',
        component: ResponsePlungingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_RESPONSE_PLUNGING'],
            pageTitle: 'niopdcgatewayApp.responsePlunging.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: ResponsePlungingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_RESPONSE_PLUNGING'],
            pageTitle: 'niopdcgatewayApp.responsePlunging.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: ResponsePlungingDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_RESPONSE_PLUNGING'],
            pageTitle: 'niopdcgatewayApp.responsePlunging.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ResponsePlungingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_RESPONSE_PLUNGING'],
            pageTitle: 'niopdcgatewayApp.responsePlunging.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
