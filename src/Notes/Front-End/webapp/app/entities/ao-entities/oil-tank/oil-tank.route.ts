import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {OilTankComponent} from './oil-tank.component';
import {OilTankPopupComponent} from './oil-tank-dialog.component';
import {OilTankDeletePopupComponent} from './oil-tank-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class OilTankResolvePagingParams implements Resolve<any> {

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

export const oilTankRoute: Routes = [
    {
        path: '',
        component: OilTankComponent,
        resolve: {
            'pagingParams': OilTankResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.oilTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':oilTankId/metre',
        loadChildren: '../metre/metre.module#NiopdcgatewayMetreModule'
    },
    {
        path: ':oilTankId/literature-volume-oil-tank',
        loadChildren: '../literature-volume-oil-tank/literature-volume-oil-tank.module#NiopdcgatewayLiteratureVolumeOilTankModule'
    },
    {
        path: ':oilTankId/service-oil-tank',
        loadChildren: '../service-oil-tank/service-oil-tank.module#NiopdcgatewayServiceOilTankModule'
    },
];

export const oilTankPopupRoute: Routes = [
    {
        path: 'new',
        component: OilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.oilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: OilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.oilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: OilTankDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.oilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: OilTankPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_OIL_TANK'],
            pageTitle: 'niopdcgatewayApp.oilTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
