import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ActionLogComponent} from './action-log.component';
import {ActionLogPopupComponent} from './action-log-dialog.component';
import {ActionLogMappingPopupComponent} from 'app/entities/action-log/action-log-mapping-dialog.component';

@Injectable({providedIn: 'root'})
export class ActionLogResolvePagingParams implements Resolve<any> {

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

export const actionLogRoute: Routes = [
    {
        path: '',
        component: ActionLogComponent,
        resolve: {
            'pagingParams': ActionLogResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_ACTION_LOG'],
            pageTitle: 'niopdcgatewayApp.actionLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];

export const actionLogPopupRoute: Routes = [
    {
        path: 'view/:id/:request',
        component: ActionLogPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REQUEST_ACTION_LOG', 'VIEW_RESPONSE_ACTION_LOG'],
            pageTitle: 'niopdcgatewayApp.actionLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mapping/:id',
        component: ActionLogMappingPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'niopdcgatewayApp.actionLog.home.mapping'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];
