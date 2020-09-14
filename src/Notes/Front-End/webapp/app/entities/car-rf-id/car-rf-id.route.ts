import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {CarRfIdComponent} from './car-rf-id.component';
import {CarRfIdPopupComponent} from './car-rf-id-dialog.component';
import {CarRfIdDeletePopupComponent} from './car-rf-id-delete-dialog.component';
import {AllocateCarRfIdPopupComponent} from 'app/entities/car-rf-id/allocate-car-rf-id-dialog.component';
import {ActiveCarRfIdPopupComponent} from 'app/entities/car-rf-id/active-car-rf-id-dialog.component';
import {CarRfIdUnAllocatePopupComponent} from 'app/entities/car-rf-id/car-rf-id-unAllocate-dialog.component';

@Injectable({providedIn: 'root'})
export class CarRfIdResolvePagingParams implements Resolve<any> {

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

export const carRfIdRoute: Routes = [
    {
        path: '',
        component: CarRfIdComponent,
        resolve: {
            'pagingParams': CarRfIdResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_CAR_RF_ID'],
            pageTitle: 'niopdcgatewayApp.carRfId.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carRfIdPopupRoute: Routes = [
    {
        path: 'car-rf-id/new/:locationId',
        component: CarRfIdPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_CAR_RF_ID'],
            pageTitle: 'niopdcgatewayApp.carRfId.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

    {
        path: 'car-rf-id/active/:id',
        component: ActiveCarRfIdPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ACTIVE_CAR_RF_ID'],
            pageTitle: 'niopdcgatewayApp.carRfId.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car-rf-id/allocate/:customerId',
        component: AllocateCarRfIdPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ALLOCATE_CAR_RF_ID'],
            pageTitle: 'niopdcgatewayApp.carRfId.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car-rf-id/:id/unAllocate',
        component: CarRfIdUnAllocatePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'UN_ALLOCATE_CAR_RF_ID'],
            pageTitle: 'niopdcgatewayApp.carRfId.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car-rf-id/:id/edit',
        component: CarRfIdPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_CAR_RF_ID'],
            pageTitle: 'niopdcgatewayApp.carRfId.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car-rf-id/:id/delete',
        component: CarRfIdDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_CAR_RF_ID'],
            pageTitle: 'niopdcgatewayApp.carRfId.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'car-rf-id/:id/:view',
        component: CarRfIdPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_CAR_RF_ID'],
            pageTitle: 'niopdcgatewayApp.carRfId.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
