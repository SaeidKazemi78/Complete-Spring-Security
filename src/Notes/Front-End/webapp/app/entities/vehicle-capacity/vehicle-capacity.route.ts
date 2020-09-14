import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {VehicleCapacityComponent} from './vehicle-capacity.component';
import {VehicleCapacityPopupComponent} from './vehicle-capacity-dialog.component';
import {VehicleCapacityDeletePopupComponent} from './vehicle-capacity-delete-dialog.component';

@Injectable({providedIn: 'root'})
export class VehicleCapacityResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const vehicleCapacityRoute: Routes = [
    {
        path: '',
        component: VehicleCapacityComponent,
        resolve: {
            'pagingParams': VehicleCapacityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VEHICLE_CAPACITY'],
            pageTitle: 'niopdcgatewayApp.vehicleCapacity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehicleCapacityPopupRoute: Routes = [
    {
        path: 'new/:vehicleModelId',
        component: VehicleCapacityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_VEHICLE_CAPACITY'],
            pageTitle: 'niopdcgatewayApp.vehicleCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: VehicleCapacityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_VEHICLE_CAPACITY'],
            pageTitle: 'niopdcgatewayApp.vehicleCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: VehicleCapacityDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VEHICLE_CAPACITY'],
            pageTitle: 'niopdcgatewayApp.vehicleCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: VehicleCapacityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_VEHICLE_CAPACITY'],
            pageTitle: 'niopdcgatewayApp.vehicleCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
