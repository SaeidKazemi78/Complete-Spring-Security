import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {LocationComponent} from './location.component';
import {LocationPopupComponent} from './location-dialog.component';
import {LocationDeletePopupComponent} from './location-delete-dialog.component';
import {NiopdcgatewayLocationModule} from 'app/entities/location/location.module';

@Injectable({providedIn: 'root'})
export class LocationResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'name,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const locationRoute: Routes = [
    {
        path: '',
        component: LocationComponent,
        resolve: {
            'pagingParams': LocationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_LOCATION'],
            pageTitle: 'niopdcgatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':locationId/sub-locations',
        loadChildren: '../location/location.module#NiopdcgatewayLocationModule'
    },
    {
        path: ':locationId/order-number',
        loadChildren: '../order-number/order-number.module#NiopdcgatewayOrderNumberModule'
    },
    {
        path: ':locationId/shift-work',
        loadChildren: '../shift-work/shift-work.module#NiopdcgatewayShiftWorkModule'
    },
    {
        path: ':locationId/car-rf-id',
        loadChildren: '../car-rf-id/car-rf-id.module#NiopdcgatewayCarRfIdModule'
    },
];

export const locationPopupRoute: Routes = [
    {
        path: 'new/:locationId',
        component: LocationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_LOCATION'],
            pageTitle: 'niopdcgatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: LocationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_LOCATION'],
            pageTitle: 'niopdcgatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: LocationDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_LOCATION'],
            pageTitle: 'niopdcgatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: LocationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_LOCATION'],
            pageTitle: 'niopdcgatewayApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];
