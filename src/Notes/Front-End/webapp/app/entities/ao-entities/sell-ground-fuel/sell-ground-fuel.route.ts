import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {SellGroundFuelComponent} from './sell-ground-fuel.component';
import {SellGroundFuelPopupComponent} from './sell-ground-fuel-dialog.component';
import {SellGroundFuelDeletePopupComponent} from './sell-ground-fuel-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class SellGroundFuelResolvePagingParams implements Resolve<any> {

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

export const sellGroundFuelRoute: Routes = [
    {
        path: '',
        component: SellGroundFuelComponent,
        resolve: {
            'pagingParams': SellGroundFuelResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_SELL_GROUND_FUEL'],
            pageTitle: 'niopdcgatewayApp.sellGroundFuel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sellGroundFuelPopupRoute: Routes = [
    {
        path: 'new/:dayDepotId',
        component: SellGroundFuelPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_SELL_GROUND_FUEL'],
            pageTitle: 'niopdcgatewayApp.sellGroundFuel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: SellGroundFuelPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_SELL_GROUND_FUEL'],
            pageTitle: 'niopdcgatewayApp.sellGroundFuel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: SellGroundFuelDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_SELL_GROUND_FUEL'],
            pageTitle: 'niopdcgatewayApp.sellGroundFuel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: SellGroundFuelPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_SELL_GROUND_FUEL'],
            pageTitle: 'niopdcgatewayApp.sellGroundFuel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
