import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {MilliPoorComponent} from './milli-poor.component';
import {MilliPoorPopupComponent} from './milli-poor-dialog.component';
import {MilliPoorDeletePopupComponent} from './milli-poor-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class MilliPoorResolvePagingParams implements Resolve<any> {

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

export const milliPoorRoute: Routes = [
    {
        path: '',
        component: MilliPoorComponent,
        resolve: {
            'pagingParams': MilliPoorResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_MILLI_POOR'],
            pageTitle: 'niopdcgatewayApp.milliPoor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const milliPoorPopupRoute: Routes = [
    {
        path: 'new',
        component: MilliPoorPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_MILLI_POOR'],
            pageTitle: 'niopdcgatewayApp.milliPoor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: MilliPoorPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_MILLI_POOR'],
            pageTitle: 'niopdcgatewayApp.milliPoor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: MilliPoorDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_MILLI_POOR'],
            pageTitle: 'niopdcgatewayApp.milliPoor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: MilliPoorPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_MILLI_POOR'],
            pageTitle: 'niopdcgatewayApp.milliPoor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
