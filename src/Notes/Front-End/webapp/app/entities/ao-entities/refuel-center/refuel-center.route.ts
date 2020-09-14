import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {RefuelCenterComponent} from './refuel-center.component';
import {RefuelCenterPopupComponent} from './refuel-center-dialog.component';
import {RefuelCenterDeletePopupComponent} from './refuel-center-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class RefuelCenterResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            size: this.paginationUtil.parsePage(size),
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const refuelCenterRoute: Routes = [
    {
        path: '',
        component: RefuelCenterComponent,
        resolve: {
            'pagingParams': RefuelCenterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':refuelCenterId/shift-work/:type',
        loadChildren: '../../shift-work/shift-work.module#NiopdcgatewayShiftWorkModule'
    },
    {
        path: ':refuelCenterId/fuel-receipt-number',
        loadChildren: '../../order-number/order-number.module#NiopdcgatewayOrderNumberModule'
    },
    {
        path: ':refuelCenterId/seal',
        loadChildren: '../../seal/seal.module#NiopdcgatewaySealModule'
    },
];

export const refuelCenterPopupRoute: Routes = [
    {
        path: 'new',
        component: RefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: RefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: RefuelCenterDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: RefuelCenterPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_REFUEL_CENTER'],
            pageTitle: 'niopdcgatewayApp.refuelCenter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
