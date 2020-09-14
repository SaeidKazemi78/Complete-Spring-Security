import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from '@angular/router';

import {ITEMS_PER_PAGE, UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {DriverComponent} from './driver.component';
import {DriverPopupComponent} from './driver-dialog.component';
import {DriverDeletePopupComponent} from './driver-delete-dialog.component';
import {DriveSecurityPopupComponent} from 'app/entities/driver/drive-security-dialog.component';

@Injectable({providedIn: 'root'})
export class DriverResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const size = route.queryParams['size'] ? route.queryParams['size'] : ITEMS_PER_PAGE;
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            size: this.paginationUtil.parsePage(size),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const driverRoute: Routes = [
    {
        path: '',
        component: DriverComponent,
        resolve: {
            'pagingParams': DriverResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_DRIVER'],
            pageTitle: 'niopdcgatewayApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':driverId/dangerous-certificate',
        loadChildren: '../dangerous-certificate/dangerous-certificate.module#NiopdcgatewayDangerousCertificateModule'
    },
    {
        path: ':driverId/pass-card',
        loadChildren: '../pass-card/pass-card.module#NiopdcgatewayPassCardModule'
    },
    {
        path: ':driverId/safety-card',
        loadChildren: '../safety-card/safety-card.module#NiopdcgatewaySafetyCardModule'
    },
];

export const driverPopupRoute: Routes = [
    {
        path: ':driverId/drive-security',
        component: DriveSecurityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_DRIVE_SECURITY', 'CREATE_DRIVE_SECURITY'],
            pageTitle: 'niopdcgatewayApp.driveSecurity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'new/:carId',
        component: DriverPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_DRIVER'],
            pageTitle: 'niopdcgatewayApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: DriverPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_DRIVER'],
            pageTitle: 'niopdcgatewayApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: DriverDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_DRIVER'],
            pageTitle: 'niopdcgatewayApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: DriverPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_DRIVER'],
            pageTitle: 'niopdcgatewayApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },

];
