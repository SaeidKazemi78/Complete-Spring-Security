import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {MeasurementOilTankComponent} from './measurement-oil-tank.component';
import {MeasurementOilTankPopupComponent} from './measurement-oil-tank-dialog.component';
import {MeasurementOilTankDeletePopupComponent} from './measurement-oil-tank-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class MeasurementOilTankResolvePagingParams implements Resolve<any> {

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

export const measurementOilTankRoute: Routes = [
    {
        path: 'measurement-oil-tank',
        component: MeasurementOilTankComponent,
        resolve: {
            'pagingParams': MeasurementOilTankResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_MEASUREMENT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.measurementOilTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const measurementOilTankPopupRoute: Routes = [
    {
        path: 'measurement-oil-tank-new',
        component: MeasurementOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_MEASUREMENT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.measurementOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'measurement-oil-tank/:id/edit',
        component: MeasurementOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_MEASUREMENT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.measurementOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'measurement-oil-tank/:id/delete',
        component: MeasurementOilTankDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_MEASUREMENT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.measurementOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'measurement-oil-tank/:id/:view',
        component: MeasurementOilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_MEASUREMENT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.measurementOilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
