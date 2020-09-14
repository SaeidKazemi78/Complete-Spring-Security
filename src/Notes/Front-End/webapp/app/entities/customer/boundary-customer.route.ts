import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';
import {BoundaryCustomerComponent} from './boundary-customer.component';
import {BoundaryPopupComponent} from './boundary-dialog.component';
import {CustomerBoundaryArchivePopupComponent} from './boundary-customer-archive-dialog.component';
import {BoundaryCustomerDeletePopupComponent} from 'app/entities/customer/boundary-customer-delete-dialog.component';
import {BoundaryCustomerPlaqueChangePopupComponent} from 'app/entities/customer/boundary-customer-plaque-change-dialog.component';

@Injectable({providedIn: 'root'})
export class CustomerResolvePagingParams implements Resolve<any> {

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

@Injectable({providedIn: 'root'})
export class BoundaryCustomerResolvePagingParams implements Resolve<any> {

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

export const boundaryCustomerRoute: Routes = [
    {
        path: '',
        component: BoundaryCustomerComponent,
        resolve: {
            'pagingParams': BoundaryCustomerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_BOUNDARY_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.titleBoundary'
        },
        canActivate: [UserRouteAccessService]
    },

    {
        path: ':customerId/car-rf-id',
        loadChildren: '../car-rf-id/car-rf-id.module#NiopdcgatewayCarRfIdModule'
    },
    {
        path: ':customerId/car-tank',
        loadChildren: '../car-tank/car-tank.module#NiopdcgatewayCarTankModule'
    },
    {
        path: ':customerId/infringement',
        loadChildren: '../infringement/infringement.module#NiopdcgatewayInfringementModule'
    }
];

export const boundaryCustomerPopupRouteEdit: Routes = [

    {
        path: 'boundary-customer/:id/edit',
        component: BoundaryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BOUNDARY_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
];

export const boundaryCustomerPopupRoute: Routes = [
    {
        path: 'new',
        component: BoundaryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_BOUNDARY_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.titleBoundary'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/archive',
        component: CustomerBoundaryArchivePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ARCHIVE_BOUNDARY_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'

    },
    {
        path: ':id/plaque-change',
        component: BoundaryCustomerPlaqueChangePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'PLAQUE_CHANGE_BOUNDARY_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: BoundaryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_BOUNDARY_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: BoundaryCustomerDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_BOUNDARY_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: BoundaryPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_BOUNDARY_CUSTOMER'],
            pageTitle: 'niopdcgatewayApp.customer.home.title',
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];


