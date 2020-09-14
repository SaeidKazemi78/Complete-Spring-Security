import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {OilTankContainerComponent} from './oil-tank-container.component';
import {OilTankContainerPopupComponent} from './oil-tank-container-dialog.component';
import {OilTankContainerDeletePopupComponent} from './oil-tank-container-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class OilTankContainerResolvePagingParams implements Resolve<any> {

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

export const oilTankContainerRoute: Routes = [
    {
        path: '',
        component: OilTankContainerComponent,
        resolve: {
            'pagingParams': OilTankContainerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_OIL_TANK_CONTAINER', 'LIST_OIL_TANK_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.oilTankContainer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const oilTankContainerPopupRoute: Routes = [
    {
        path: 'new/:parentType',
        component: OilTankContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_OIL_TANK_CONTAINER', 'CREATE_OIL_TANK_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.oilTankContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
    ,
    {
        path: ':id/:parent/edit',
        component: OilTankContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_OIL_TANK_CONTAINER', 'EDIT_OIL_TANK_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.oilTankContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: OilTankContainerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_OIL_TANK_CONTAINER', 'DELETE_OIL_TANK_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.oilTankContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:parent/:view',
        component: OilTankContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_OIL_TANK_CONTAINER', 'VIEW_OIL_TANK_PRODUCT'],
            pageTitle: 'niopdcgatewayApp.oilTankContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
