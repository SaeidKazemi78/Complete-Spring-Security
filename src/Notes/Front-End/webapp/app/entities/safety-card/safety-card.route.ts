import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {SafetyCardComponent} from './safety-card.component';
import {SafetyCardPopupComponent} from './safety-card-dialog.component';
import {SafetyCardDeletePopupComponent} from './safety-card-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class SafetyCardResolvePagingParams implements Resolve<any> {

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

export const safetyCardRoute: Routes = [
    {
        path: '',
        component: SafetyCardComponent,
        resolve: {
            'pagingParams': SafetyCardResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SAFETY_CARD'],
            pageTitle: 'niopdcgatewayApp.safetyCard.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const safetyCardPopupRoute: Routes = [
    {
        path: 'new/:driverId',
        component: SafetyCardPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_SAFETY_CARD'],
            pageTitle: 'niopdcgatewayApp.safetyCard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: SafetyCardPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SAFETY_CARD'],
            pageTitle: 'niopdcgatewayApp.safetyCard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: SafetyCardDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SAFETY_CARD'],
            pageTitle: 'niopdcgatewayApp.safetyCard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: SafetyCardPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SAFETY_CARD'],
            pageTitle: 'niopdcgatewayApp.safetyCard.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
