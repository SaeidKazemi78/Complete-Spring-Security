import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ShiftWorkComponent} from './shift-work.component';
import {ShiftWorkPopupComponent} from './shift-work-dialog.component';
import {ShiftWorkDeletePopupComponent} from './shift-work-delete-dialog.component';
import {ShiftWorkOpenClosePopupDialogComponent} from './shift-work-open-close-dialog.component';

@Injectable({providedIn: 'root'})
export class ShiftWorkResolvePagingParams implements Resolve<any> {

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

export const shiftWorkRoute: Routes = [
    {
        path: '',
        component: ShiftWorkComponent,
        resolve: {
            'pagingParams': ShiftWorkResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SHIFT_WORK'],
            pageTitle: 'niopdcgatewayApp.shiftWork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shiftWorkPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ShiftWorkDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SHIFT_WORK'],
            pageTitle: 'niopdcgatewayApp.shiftWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: ':id/shift/:mode',
        component: ShiftWorkOpenClosePopupDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'OPEN_SHIFT_WORK', 'CLOSE_SHIFT_WORK'],
            pageTitle: 'niopdcgatewayApp.shiftWork.home.title',
            location: false
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/shift/:mode/:type',
        component: ShiftWorkOpenClosePopupDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SHIFT_WORK'],
            pageTitle: 'niopdcgatewayApp.shiftWork.home.title',
            location: false
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: ShiftWorkPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SHIFT_WORK'],
            pageTitle: 'niopdcgatewayApp.shiftWork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

export const shiftWorkOpenClosePopupRoute: Routes = [
    {
        path: 'location/:locationId/shift/:mode',
        component: ShiftWorkOpenClosePopupDialogComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'OPEN_SHIFT_WORK', 'CLOSE_SHIFT_WORK'],
            pageTitle: 'niopdcgatewayApp.shiftWork.home.title',
            location: true
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];
