import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {MetreComponent} from './metre.component';
import {MetrePopupComponent} from './metre-dialog.component';
import {MetreDeletePopupComponent} from './metre-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class MetreResolvePagingParams implements Resolve<any> {

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

export const metreRoute: Routes = [
    {
        path: '',
        component: MetreComponent,
        resolve: {
            'pagingParams': MetreResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_METRE'],
            pageTitle: 'niopdcgatewayApp.metre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const metrePopupRoute: Routes = [
    {
        path: 'new/:oilTankId',
        component: MetrePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_METRE'],
            pageTitle: 'niopdcgatewayApp.metre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit/:oilTankId',
        component: MetrePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_METRE'],
            pageTitle: 'niopdcgatewayApp.metre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: MetreDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_METRE'],
            pageTitle: 'niopdcgatewayApp.metre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: MetrePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_METRE'],
            pageTitle: 'niopdcgatewayApp.metre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
