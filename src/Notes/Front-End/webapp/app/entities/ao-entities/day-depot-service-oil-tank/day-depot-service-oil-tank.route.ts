import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {DayDepotServiceOilTankComponent} from './day-depot-service-oil-tank.component';
import {DayDepotServiceOilTankPopupComponent} from './day-depot-service-oil-tank-dialog.component';
import {DayDepotServiceOilTankDeletePopupComponent} from './day-depot-service-oil-tank-delete-dialog.component';
import {FullEndMeasurementPopupComponent} from './full-end-measurement-dialog.component';

@Injectable({ providedIn: 'root' })
export class DayDepotServiceOilTankResolvePagingParams implements Resolve<any> {

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

export const dayDepotServiceOilTankRoute: Routes = [
    {
        path: '',
        component: DayDepotServiceOilTankComponent,
        resolve: {
            'pagingParams': DayDepotServiceOilTankResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DAY_DEPOT_SERVICE_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.dayDepotServiceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dayDepotServiceOilTankPopupRoute: Routes = [
    {
        path: 'new/:dayDepotId',
        component: DayDepotServiceOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_DAY_DEPOT_SERVICE_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.dayDepotServiceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/day-depot/:dayDepotId/:type',
        component: DayDepotServiceOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_DAY_DEPOT_SERVICE_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.dayDepotServiceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: DayDepotServiceOilTankDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_DAY_DEPOT_SERVICE_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.dayDepotServiceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/day-depot/:dayDepotId/:view',
        component: DayDepotServiceOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_DAY_DEPOT_SERVICE_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.dayDepotServiceOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'full-end-measurement/:id',
        component: FullEndMeasurementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CLOSE_MAIN_DAY_DEPOT'],
            pageTitle: 'niopdcgatewayApp.mainDayDepot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];
