import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {PassCardComponent} from './pass-card.component';
import {PassCardPopupComponent} from './pass-card-dialog.component';
import {PassCardDeletePopupComponent} from './pass-card-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class PassCardResolvePagingParams implements Resolve<any> {

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

export const passCardRoute: Routes = [
    {
        path: '',
        component: PassCardComponent,
        resolve: {
            'pagingParams': PassCardResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_PASS_CARD'],
            pageTitle: 'niopdcgatewayApp.passCard.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const passCardPopupRoute: Routes = [
    {
        path: 'new/:driverId',
        component: PassCardPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_PASS_CARD'],
            pageTitle: 'niopdcgatewayApp.passCard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: PassCardPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_PASS_CARD'],
            pageTitle: 'niopdcgatewayApp.passCard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: PassCardDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_PASS_CARD'],
            pageTitle: 'niopdcgatewayApp.passCard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: PassCardPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_PASS_CARD'],
            pageTitle: 'niopdcgatewayApp.passCard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
