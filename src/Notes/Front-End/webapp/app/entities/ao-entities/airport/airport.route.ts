import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {AirportComponent} from './airport.component';
import {AirportPopupComponent} from './airport-dialog.component';
import {AirportDeletePopupComponent} from './airport-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class AirportResolvePagingParams implements Resolve<any> {

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

export const airportRoute: Routes = [
    {
        path: '',
        component: AirportComponent,
        resolve: {
            'pagingParams': AirportResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'LIST_AIRPORT'],
            pageTitle: 'niopdcgatewayApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },

    {
        path: ':id/pos',
        loadChildren: '../../pos-device/pos-device.module#NiopdcgatewayPosDeviceModule'
    },
];

export const airportPopupRoute: Routes = [
    {
        path: 'new',
        component: AirportPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'CREATE_AIRPORT'],
            pageTitle: 'niopdcgatewayApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/edit',
        component: AirportPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'EDIT_AIRPORT'],
            pageTitle: 'niopdcgatewayApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/delete',
        component: AirportDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'DELETE_AIRPORT'],
            pageTitle: 'niopdcgatewayApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: ':id/:view',
        component: AirportPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'VIEW_AIRPORT'],
            pageTitle: 'niopdcgatewayApp.airport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
