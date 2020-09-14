import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {PosComponent} from './pos.component';
import {PosPopupComponent} from './pos-dialog.component';
import {PosDeletePopupComponent} from './pos-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class PosResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const posRoute: Routes = [
    {
        path: 'airport/:airportId/pos',
        component: PosComponent,
        resolve: {
            'pagingParams': PosResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_POS'],
            pageTitle: 'niopdcgatewayApp.pos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const posPopupRoute: Routes = [
    {
        path: 'pos-new/:airportId',
        component: PosPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_POS'],
            pageTitle: 'niopdcgatewayApp.pos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pos/:id/edit',
        component: PosPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_POS'],
            pageTitle: 'niopdcgatewayApp.pos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pos/:id/delete',
        component: PosDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_POS'],
            pageTitle: 'niopdcgatewayApp.pos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pos/:id/:view',
        component: PosPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_POS'],
            pageTitle: 'niopdcgatewayApp.pos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
