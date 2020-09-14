import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {MetreLogComponent} from './metre-log.component';
import {MetreLogPopupComponent} from './metre-log-dialog.component';
import {MetreLogDeletePopupComponent} from './metre-log-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class MetreLogResolvePagingParams implements Resolve<any> {

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

export const metreLogRoute: Routes = [
    {
        path: 'metre-log',
        component: MetreLogComponent,
        resolve: {
            'pagingParams': MetreLogResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_METRE_LOG'],
            pageTitle: 'niopdcgatewayApp.metreLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const metreLogPopupRoute: Routes = [
    {
        path: 'metre-log-new',
        component: MetreLogPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_METRE_LOG'],
            pageTitle: 'niopdcgatewayApp.metreLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'metre-log/:id/edit',
        component: MetreLogPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_METRE_LOG'],
            pageTitle: 'niopdcgatewayApp.metreLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'metre-log/:id/delete',
        component: MetreLogDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_METRE_LOG'],
            pageTitle: 'niopdcgatewayApp.metreLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'metre-log/:id/:view',
        component: MetreLogPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_METRE_LOG'],
            pageTitle: 'niopdcgatewayApp.metreLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
