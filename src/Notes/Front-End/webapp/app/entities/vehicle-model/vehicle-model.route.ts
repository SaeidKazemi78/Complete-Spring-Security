import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {VehicleModelComponent} from './vehicle-model.component';
import {VehicleModelPopupComponent} from './vehicle-model-dialog.component';
import {VehicleModelDeletePopupComponent} from './vehicle-model-delete-dialog.component';
import {VehicleModelConfirmPopupComponent} from "app/entities/vehicle-model/vehicle-model-confirm-dialog.component";

@Injectable({providedIn: 'root'})
export class VehicleModelResolvePagingParams implements Resolve<any> {

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

export const vehicleModelRoute: Routes = [
    {
        path: '',
        component: VehicleModelComponent,
        resolve: {
            'pagingParams': VehicleModelResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_VEHICLE_MODEL'],
            pageTitle: 'niopdcgatewayApp.vehicleModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':vehicleModelId/vehicle-capacity',
        loadChildren: '../vehicle-capacity/vehicle-capacity.module#NiopdcgatewayVehicleCapacityModule'
    },

];

export const vehicleModelPopupRoute: Routes = [
    {
        path: 'new',
        component: VehicleModelPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_BOUNDARY_VEHICLE_MODEL', 'CREATE_AIRPLANE_VEHICLE_MODEL'],
            pageTitle: 'niopdcgatewayApp.vehicleModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: VehicleModelPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_VEHICLE_MODEL'],
            pageTitle: 'niopdcgatewayApp.vehicleModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: VehicleModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_VEHICLE_MODEL'],
            pageTitle: 'niopdcgatewayApp.vehicleModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/confirm',
        component: VehicleModelConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CONFIRM_VEHICLE_MODEL'],
            pageTitle: 'niopdcgatewayApp.vehicleModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/revert-confirm',
        component: VehicleModelConfirmPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'REVERT_CONFIRM_VEHICLE_MODEL'],
            pageTitle: 'niopdcgatewayApp.vehicleModel.home.title',
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup',
    },
    {
        path: ':id/:view',
        component: VehicleModelPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_VEHICLE_MODEL'],
            pageTitle: 'niopdcgatewayApp.vehicleModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
