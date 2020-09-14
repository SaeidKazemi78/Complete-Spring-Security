import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../../shared/index';
import {JhiPaginationUtil} from 'ng-jhipster';

import {DayDepotContainerComponent} from './day-depot-container.component';
import {DayDepotContainerPopupComponent} from './day-depot-container-dialog.component';
import {DayDepotContainerDeletePopupComponent} from './day-depot-container-delete-dialog.component';
import {FullEndMeasurementPopupComponent} from './full-end-measurement-dialog.component';

@Injectable({ providedIn: 'root' })
export class DayDepotContainerResolvePagingParams implements Resolve<any> {

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

export const dayDepotContainerRoute: Routes = [
    {
        path: '',
        component: DayDepotContainerComponent,
        resolve: {
            'pagingParams': DayDepotContainerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DAY_DEPOT_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.dayDepotContainer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':dayDepotContainerId/send-container-product',
        loadChildren: '../send-container-product/send-container-product.module#NiopdcgatewaySendContainerProductModule'
    },
    {
        path: ':dayDepotContainerId/received-product-container',
        loadChildren: '../received-product-container/received-product-container.module#NiopdcgatewayReceivedProductContainerModule'
    },
    {
        path: ':dayDepotContainerId/change-container',
        loadChildren: '../change-container/change-container.module#NiopdcgatewayChangeContainerModule'
    },
];

export const dayDepotContainerPopupRoute: Routes = [
    {
        path: 'new/:mainDayDepotId',
        component: DayDepotContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_DAY_DEPOT_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.dayDepotContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'full-end-measurement/:id',
        component: FullEndMeasurementPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_DAY_DEPOT_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.dayDepotContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: DayDepotContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_DAY_DEPOT_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.dayDepotContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: DayDepotContainerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_DAY_DEPOT_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.dayDepotContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: DayDepotContainerPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_DAY_DEPOT_CONTAINER'],
            pageTitle: 'niopdcgatewayApp.dayDepotContainer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
