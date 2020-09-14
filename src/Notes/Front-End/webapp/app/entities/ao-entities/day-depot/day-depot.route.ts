import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {DayDepotComponent} from './day-depot.component';
import {DayDepotPopupComponent} from './day-depot-dialog.component';
import {DayDepotDeletePopupComponent} from './day-depot-delete-dialog.component';
import {FullEndMeasurementPopupComponent} from './full-end-measurement-dialog.component';
import {transferDirtyPopupRoute} from "app/entities/ao-entities/transfer";

@Injectable({ providedIn: 'root' })
export class DayDepotResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'oilTankTitle,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const dayDepotRoute: Routes = [
    {
        path: '',
        component: DayDepotComponent,
        resolve: {
            'pagingParams': DayDepotResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        children:[
            ...transferDirtyPopupRoute
        ]
    },
    {
        path: ':dayDepotId/transfer/:type',
        loadChildren: '../transfer/transfer.module#NiopdcgatewayTransferModule'
    },
    {
        path: ':dayDepotId/transfer-platform-to-unit',
        loadChildren: '../transfer-platform-to-unit/transfer-platform-to-unit.module#NiopdcgatewayTransferPlatformToUnitModule'
    },
    {
        path: ':dayDepotId/change-container',
        loadChildren: '../change-container/change-container.module#NiopdcgatewayChangeContainerModule'
    },{
        path: ':dayDepotId/sell-ground-fuel',
        loadChildren: '../sell-ground-fuel/sell-ground-fuel.module#NiopdcgatewaySellGroundFuelModule'
    },{
        path: ':dayDepotId/log-book',
        loadChildren: '../log-book/log-book.module#NiopdcgatewayLogBookModule'
    },{
        path: ':dayDepotId/way-bill/:mode',
        loadChildren: '../../way-bill/way-bill.module#NiopdcgatewayWayBillModule'
    },{
        path: ':dayDepotId/day-depot-service-oil-tank',
        loadChildren: '../day-depot-service-oil-tank/day-depot-service-oil-tank.module#NiopdcgatewayDayDepotServiceOilTankModule'
    },
];

export const dayDepotPopupRoute: Routes = [
    {
        path: 'full-end-measurement/:id',
        component: FullEndMeasurementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'FULL_END_MEASUREMENT'],
            pageTitle: 'niopdcgatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: DayDepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: DayDepotDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: DayDepotPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.dayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

];
